import productServices from '../services/products.service.js'
import { newBuySchema, editBuySchema } from '../schemas/buy.schema.js';

class BuyModel {
  constructor() {
    this.buys = [
      {
        id: 1,
        userId: 10,
        products:[
          {
            productId: 13,
            cant: 2,
            subTotal: 154.35
          },{
            productId: 4,
            cant: 6,
            subTotal: 563.12
          }
        ],
        total: 717.47
      },
      {
        id: 2,
        userId: 13,
        products:[
          {
            productId: 2,
            cant: 9,
            subTotal: 824.35
          },{
            productId: 9,
            cant: 1,
            subTotal: 11.23
          }
        ],
        total: 835.58
      }
    ]
  };

  getBuy = async () => {
    return this.buys;
  };

  getBuyById = async (id) => {
    return await this.buys.find((buy) => buy.id == id);
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

    //Comienzo a armar la compra y validar si el stock alcanza para ralizar la compra y actualizar el stock
    let valorTotal = 0;
    const newBuy = {
      id: this.buys.length + 1,
      userId: userId,
      products: []
    };

    for (const item of buy.compra){
      //Obtengo el producto para validar si existe y si el stock alcanza.
      const product = catalog.find(catalogProduct => catalogProduct.id == item.productId);
      if (!product){
        throw {statusCode: 404, message: 'Producto inexistente.'};
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
    //Persisto la venta
    this.buys.push(newBuy);
    return newBuy;
  };
  
  editBuy = async (id, data) => {
    //Valido usando el esquema
    const { error } = editBuySchema.validate(data);
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      throw { statusCode: 400, message: `Error en el modelo de compra: ${errorMessage}` };
    }
    
    //Valido que exita la compra
    const buy = await this.getBuyById(id);
    if (!buy) {
      return { status: 404, message: "La compra no existe." };
    }
    //Hago el update
    data.id = id;
    const index = this.buys.findIndex((buy) => buy.id == id);
    this.buys.splice(index, 1, data);
    return data;
  };

  deleteBuy = async (id) => {
    //Valido que exista la compra
    const buy = await this.getBuyById(id);
    if (!buy) {
      return { statusCode: 404, message: "La compra no existe." };
    }
    //Hago el delete
    const index = this.buys.findIndex((buy) => buy.id === id);
    const [compraBorrada] = this.buys.splice(index, 1);
    return { Resultado: "Compra eliminada correctamente.", compraBorrada };
  };
}

export default BuyModel;