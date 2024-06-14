import ModelFactory from "../models/DAO/Factory.js";
import config from "../../config.js";
import buyModel from '../models/buy.models.js'

class BuyServices {
    constructor() {
      this.model = new buyModel();
    }
  
    getBuy = async () => {
      const buy = await this.model.getBuy();
      return buy;
    };

    newBuy = async (newBuy) => {
      const buy = await this.model.newBuy(newBuy);
      return buy;
    };
     editBuy = async (id, data) => {
        const buy = await model.editBuy(id, data)
        return buy
    }
  }
  
  export default BuyServices;