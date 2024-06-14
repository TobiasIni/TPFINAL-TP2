import BuyController from "../controllers/buy.controller.js";
import express from 'express';

class Router {
    constructor() {
      this.router = express.Router();
      this.controller = new BuyController();
    }
  
    start() {
      this.router.get("/buy", this.controller.getBuy);
      this.router.post("/buy", this.controller.newBuy);
      this.router.put("/buy", this.controller.editBuy)
      return this.router;
    }
  }
  
  export default Router;