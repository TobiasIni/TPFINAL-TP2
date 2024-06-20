import ProductsModel from "../models/products.model.js";

class ProductsServices {
  constructor() {
    this.model = new ProductsModel();
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
  
export default ProductsServices;