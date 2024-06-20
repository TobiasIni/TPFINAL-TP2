import BuyController from "../controllers/buy.controller.js";
import express from 'express';

class Router {
    constructor() {
      this.router = express.Router();
      this.controller = new BuyController();
    }
  
    start() {
      this.router.get("/buy", this.controller.getBuy);
      this.router.get("/buy/:id", this.controller.getBuyById);
      this.router.post("/buy", this.controller.newBuy);
      this.router.put("/buy/:id", this.controller.editBuy);
      this.router.delete("/buy/:id", this.controller.deleteBuy);
      return this.router;
    }
  }
  
  export default Router;