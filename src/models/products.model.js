import { newProductSchema, editProductSchema } from "../schemas/product.schema.js";

class ProductsModel {
    constructor() {
      this.products = [
        {
          id: 1,
          name: "Campera",
          description: "Campera de cuero",
          currency: "U$D",
          price: 12.35,
          stock: 72
        },
        {
          id: 2,
          name: "Remera",
          description: "Remera de modal",
          currency: "U$D",
          price: 2.16,
          stock: 37
        },
        {
          id: 3,
          name: "Gorra",
          description: "Gorra de lana",
          currency: "U$D",
          price: 5.97,
          stock: 54
        }
      ];
    }

    getProducts = async () => {
      return this.products;
    };
  
    getProductsById = async (id) => {
      const product = await this.products.find((prod) => prod.id == id);
      return product;
    };

    newProduct = async (prod) => {
      prod.id = this.products.length + 1
      //Valido con el esquema de productos
      const { error } = newProductSchema.validate(prod);
      if (error) {
        throw {statusCode: 400, message: error.details[0].message};
      }

      await this.products.push(prod);
      return prod;
    };

    editProduct = async (id, data) =>{
      data.id = id;
      //Valido con el esquema de edit
      const { error } = editProductSchema.validate(data);
      if (error) {
        throw {statusCode: 400, message: error.details[0].message};
      }
      // Valido que el producto exista
      const index = this.products.findIndex((prod) => prod.id == id);
      if (index === -1) {
        throw {statusCode: 404, message: 'Producto inexistente.'};
      }
      // Hago el update
      this.products[index] = { ...this.products[index], ...data };
      return this.products[index];
    };

    deleteProduct = async (id) => {
      //Valido que el producto exista
      const product = await this.getProductsById(id);
      if (!product) {
        throw {statusCode: 404, message: 'Producto inexistente.'};
      }
      //Hago el delete
      const index = this.products.findIndex((prod) => prod.id === id);
      const [productoBorrado] = this.products.splice(index, 1);
      return { Resultado: "Producto eliminado correctamente.", productoBorrado };
    };
  }
  
  export default ProductsModel;