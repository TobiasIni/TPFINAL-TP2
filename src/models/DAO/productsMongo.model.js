import MongoConnection from "../DAO/mongoConnection.js"

class ProductsModelMongoDB {
    constructor() {

    }

    getProducts = async () => {
      //FIX: añadir método find()
      const products = await MongoConnection.db.collection("products").find({}).toArray()
      return products;
    };
  
    getProductsById = async (id) => {

    };

    pushProduct = async (prod) => {

    };
  }
  
  export default ProductsModelMongoDB;