import MongoConnection from "../DAO/mongoConnection.js"
import { newProductSchema, editProductSchema } from "../../schemas/product.schema.js";



class ProductsModelMongoDB {
    constructor() {
       
    }

    getProducts = async () => {
      //Uso del metodo Find() para encontrar los datos de products
      const products = await MongoConnection.db.collection("products").find({}).toArray()
      products.forEach(product => {
        delete product._id;
      });
      //lista de productos
      return products;
    };
  
    getProductsById = async (id) => {
      const products = await this.getProducts();
      //busco un producto por id
      const product = products.find((element)=>element.id ==id)
      if(!product){
        throw { statusCode: 404, message: 'Producto inexistente' };
      }
      return product
    };

    newProduct = async (prod) => {
      //Valido usando el esquema
      const { error } = newProductSchema.validate(prod);
      if (error) {
          const errorMessage = error.details.map(detail => detail.message).join(', ');
          throw { statusCode: 400, message: `Error en el modelo de dato del usario: ${errorMessage}` };
      }
      const products = await MongoConnection.db.collection("products").find({}).toArray()
      //le doy una ID al nuevo producto
      prod.id = products.length + 1;
      prod.currency = 'USD';
      //agrego el producto a la base de datos
      const newProduct = await MongoConnection.db.collection("products").insertOne(prod);
      return await this.getProductsById(prod.id);
    };

    editProduct = async (id, data) => {
      //Valido usando el esquema
      const { error } = editProductSchema.validate(data);
      if (error) {
          const errorMessage = error.details.map(detail => detail.message).join(', ');
          throw { statusCode: 400, message: `Error en el modelo del usuario: ${errorMessage}` };
      }
      //Elimino _id para poder editar
      delete data._id;
      //Busco un elemento por id y le cargo nuevos datos y lo actualizo 
      const updatedProduct = await MongoConnection.db.collection("products").findOneAndUpdate({ id: id }, {$set: data}, { returnOriginal: false });
      // Valido que el producto exista
      if (!updatedProduct) {
        throw { statusCode: 404, message: 'Producto inexistente.' };
      }
      delete updatedProduct._id;
      return updatedProduct;
    }

   deleteProduct = async (productId) => {
    //Me aseguro que sea un int
    const productIntId = parseInt(productId, 10);
    //Obtengo el producto
    const product = await this.getProductsById(productIntId);
    // Eliminar el producto
    const deletedProduct = await MongoConnection.db.collection("products").deleteOne(product);
    // Validar que el producto existía y fue eliminado
    if (!deletedProduct.deletedCount) {
      throw new Error(`Producto no encontrado`);
    }
    // Devolver resultado
    return { Resultado: "Producto eliminado correctamente.", ProductoEliminado: product};
  };

  //Usar solamente para vaciar la base
  borrarBD = async () => {
    try {
      const listProductos = await this.getProducts();
  
      // Usar Promise.all para esperar a que todas las promesas se resuelvan
      const results = await Promise.all(listProductos.map(async product => {
        const productoLimpiado = await MongoConnection.db.collection("products").deleteOne({ _id: product._id });
        return productoLimpiado;
      }));
  
      console.log(results);
      return { Resultado: "Todo borrado" };
    } catch (error) {
      console.error("Error al borrar la base de datos:", error);
      return { Resultado: "Error al borrar" };
    }
  };

}

export default ProductsModelMongoDB;