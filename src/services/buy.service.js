import BuyModel from '../models/DAO/buyMongo.model.js'

class BuyServices {
  constructor() {
    this.model = new BuyModel();
  }

  getBuy = async () => {
    const buy = await this.model.getBuy();
    return buy;
  };

  getBuyById = async (id) => {
    const buy = await this.model.getBuyById(id);
    return buy;
  };

  newBuy = async (userId, newBuy, moneda, ciudad, envio) => {
    const buy = await this.model.newBuy(userId, newBuy, moneda, ciudad, envio);
    return buy;
  };

  editBuy = async (id, data) => {
    const buy = await this.model.editBuy(id, data)
    return buy
  }

  deleteBuy = async (id) => {
    const buy = await this.model.deleteBuy(id)
    return buy
  }
}

export default BuyServices;