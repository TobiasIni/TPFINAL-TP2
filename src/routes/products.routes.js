import ProductsController from "../controllers/products.controller.js";
import express from 'express';

class Router {
    constructor() {
      this.router = express.Router();
      this.controller = new ProductsController();
    }
  
    start() {
      this.router.get("/products", this.controller.getProducts);
      this.router.get("/products/:id", this.controller.getProductsId);
      this.router.post("/products", this.controller.newProduct);

      return this.router;
    }
  }
  
  export default Router;