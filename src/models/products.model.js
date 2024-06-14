class ProductsModel {
    constructor() {
      this.products = [
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
      const data = await this.products.push(prod)
      return prod;
    };
  }
  
  export default ProductsModel;