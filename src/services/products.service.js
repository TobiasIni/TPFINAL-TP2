import ProductsModel from "../models/products.model.js";

class ProductsServices {
  constructor() {
    if(ProductsServices.instance){
      return ProductsServices.instance;
    }

    this.model = new ProductsModel();
    ProductsServices.instance = this;

    return this;
  }

  getProducts = async () => {
    const products = await this.model.getProducts();
    return products;
  };

  getProductsById = async (id) => {
    const products = await this.model.getProductsById(id);
    return products;
  };

  newProduct = async (prod) => {
    const product = await this.model.newProduct(prod);
    return product;
  };

  editProduct = async (id, data) => {
    const product = await this.model.editProduct(id, data)
    return product
  };

  deleteProduct = async (id, data) => {
    const product = await this.model.deleteProduct(id)
    return product
  }
}

const instance = new ProductsServices();
Object.freeze(instance);
  
export default instance;