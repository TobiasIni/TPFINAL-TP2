import MongoConnection from "../DAO/mongoConnection.js";
import productServices from '../../services/products.service.js';
import { newBuySchema, editBuySchema } from '../../schemas/buy.schema.js';

class ProductsModelMongoDB {
    constructor() {
        this.myCollection = "buy";
    }

    getBuy = async () => {
        const buys = await MongoConnection.db.collection(this.myCollection).find({}).toArray();

        //Elimino _id de la respuesta
        buys.forEach(buy => {
            delete buy._id;
        });
        return buys;
    };
  
    getBuyById = async (id) => {
        const buys = await this.getBuy();
        const buy = buys.find((element)=>element.id == id);
        return buy || "Compra inexistente!";
    };

    newBuy = async (userId, buy) => {
        //Valido usando el esquema
        const { error } = newBuySchema.validate(buy);
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            throw { statusCode: 400, message: `Error en el modelo de dato de la compra: ${errorMessage}` };
        }

        //Uso el servicio de productos para traerme el catalogo
        const catalog = await productServices.getProducts();

        //Calculo id
        const buys = await this.getBuy();
        const buyId = buys.length + 1;

        //Comienzo a armar la compra y validar si el stock alcanza para ralizar la compra y actualizar el stock
        let valorTotal = 0;
        const newBuy = {
        id: buyId,
        userId: userId,
        products: []
        };

        for (const item of buy.compra){
            //Obtengo el producto para validar si existe y si el stock alcanza.
            const product = catalog.find(catalogProduct => catalogProduct.id == item.productId);
            if (!product){
              throw {statusCode: 404, message: 'Compra inexistente.'};
            }
            if (item.cant > product.stock){
              throw {statusCode: 409, message: 'No se puede realizar la compra por falta de stock.'};
            }
      
            //Actualizo el stock del producto
            product.stock -= item.cant;
            await productServices.editProduct(product.id, product);
      
            //Armo el item de la compra por producto
            const itemCompra = {
              productId: product.id,
              cant: item.cant,
              subTotal: item.cant * product.price
            }
      
            //Acumulo el total
            valorTotal += itemCompra.subTotal;
            //Agrego al array de productos de la compra
            newBuy.products.push(itemCompra);
        }
      
        newBuy.total = valorTotal;

        //Persisto la compra en mongo
        const result = await MongoConnection.db.collection(this.myCollection).insertOne(newBuy);
        //Devuelvo el documento insertado usando el insertedId para recuperar el documento completo
        const insertedBuy = await MongoConnection.db.collection(this.myCollection).findOne({ _id: result.insertedId });
        delete insertedBuy._id;
        return insertedBuy;
    };

    editBuy = async (id, data) => {
        //Me aseguro que sea un int
        const intId = parseInt(id, 10);
        data.id = intId;
        
        //Valido usando el esquema
        const { error } = editBuySchema.validate(data);
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            throw { statusCode: 400, message: `Error en el modelo de compra: ${errorMessage}` };
        }

        //Persisto en mongo
        const updatedBuy = await MongoConnection.db.collection(this.myCollection).findOneAndUpdate(
            { id: intId },
            { $set: data },
            { returnDocument: 'after' }
        );

        //Valido que la compra exista
        if (!updatedBuy) {
            throw { statusCode: 404, message: 'Compra inexistente.' };
        }
        delete updatedBuy._id;
        return updatedBuy;
    }

    deleteBuy = async (buyId) => {
        //Me aseguro que sea un int
        const buyIntId = parseInt(buyId, 10);

        //Obtengo el objeto
        const buy = await this.getBuyById(buyIntId);

        //Elimino la compra
        const deletedBuy = await MongoConnection.db.collection(this.myCollection).deleteOne(buy);

        //Valido que el producto existía y fue eliminado
        if (!deletedBuy.deletedCount) {
            throw { statusCode: 404, message: 'Producto inexistente.' };
        }
        return { Resultado: 'Compra eliminada correctamente.', compraEliminada: buy };;
    };
}

export default ProductsModelMongoDB;