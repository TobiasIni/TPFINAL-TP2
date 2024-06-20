import ProductsModel from "../models/products.model.js";

class ProductsServices {
  constructor() {
    this.model = new ProductsModel();
  }

  getProducts = async () => {
    const products = await this.model.getProducts();
    return products;
  };

  newProduct = async (prod) => {
    const product = await this.model.newProduct(prod);
    return product;
  };

  editProduct = async (id, data) => {
    const buy = await model.editProduct(id, data)
    return buy
  }
}
  
export default ProductsServices;