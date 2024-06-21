import BuyServices from "../services/buy.service.js";

class BuyController {
  constructor() {
    this.services = new BuyServices();
  }

  getBuy = async (req, res) => {
    const buy = await this.services.getBuy();
    res.send(buy);
  };

  getBuyById = async (req, res) => {
    const { id } = req.params;
    const buy = await this.services.getBuyById(id);
    res.send(buy);
  };

  newBuy = async (req, res) => {
    try {
      const buy = req.body
      const token = req.headers['authtoken'];
      //TODO: Agregar la validacion de roles llamando al user.Constrolelrs para que valide si el token
      // pertenece a algun usuario valido y si tiene permisos de usar este metodo

      const data = await this.services.newBuy(token, buy);
      res.send(data);
      
    } catch (error) {
      res.status(error.statusCode || 500).json({ EstadoCompra: error.message });
    }
  };

  editBuy = async (req, res) => {
    try {
      const { id } = req.params;
      const editBuy = req.body;
      const buy = await this.services.editBuy(id, editBuy);
      res.send(buy);
    } catch (error) {
      res.status(error.statusCode || 500).json({ Error: error.message });
    }
  }

  deleteBuy = async (req, res) => {
    const { id } = req.params;
    const buy = await this.services.deleteBuy(id);
    res.send(buy);
  }
}

export default BuyController;