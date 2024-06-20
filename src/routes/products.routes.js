import ProductsController from "../controllers/products.controller.js";
import express from 'express';

class Router {
    constructor() {
      this.router = express.Router();
      this.controller = new ProductsController();
    }
  
    start() {
      this.router.get("/products", this.controller.getProducts);
      this.router.get("/products/:id", this.controller.getProductId);
      this.router.post("/products", this.controller.newProduct);
      this.router.put("/products/:id", this.controller.editProduct);
      this.router.delete("/products/:id", this.controller.deleteProducts);

      return this.router;
    }
  }
  
  export default Router;