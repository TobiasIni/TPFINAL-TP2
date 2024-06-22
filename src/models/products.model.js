import { newProductSchema, editProductSchema } from "../schemas/product.schema.js";
import ProductsModelMongoDB from "../models/DAO/productsMongo.model.js"

class ProductsModel {
    constructor() {
      this.productMongo = new ProductsModelMongoDB()
    }

    getProducts = async () => {
      return this.productMongo.getProducts();
    };
  
    getProductsById = async (id) => {
      const product = await this.productMongo.getProductsById(id);
      return product;
    };

    newProduct = async (prod) => {
      //Valido con el esquema de productos
      const { error } = newProductSchema.validate(prod);
      if (error) {
        throw {statusCode: 400, message: error.details[0].message};
      }

      await this.productMongo.newProduct(prod);
      return prod;
    };

    editProduct = async (id, data) =>{
      //Valido con el esquema de edit
      const { error } = editProductSchema.validate(data);
      if (error) {
        throw {statusCode: 400, message: error.details[0].message};
      }
      // Hago el update
     await this.productMongo.editProduct(id, data)
      return (id, data);
    };

    deleteProduct = async (id) => {
      //busco producto por id
      const product = await this.productMongo.getProductsById(id);
      //valido que el producto exista
      if (!product) {
        throw {statusCode: 404, message: 'Producto inexistente.'};
      }
      //llamo el delete
      await this.productMongo.deleteProduct(product)
      return { Resultado: "Producto eliminado correctamenchi."};
    };
  }
  
  export default ProductsModel;