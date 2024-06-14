import BuyServices from "../services/buy.service.js";

class BuyController {
    constructor() {
      this.services = new BuyServices();
    }

    getBuy = async (req, res) => {
      const buy = await this.services.getBuy();
      res.send(buy);
    };

    newBuy = async (req, res) => {
      try {
        const buy = req.body
        //Podemos tener una capa gruesa de validaciones en el controlador
        if(typeof(buy) === "object"){
          const data = await this.services.newBuy(buy);
          res.send(data);
        }
    } catch (error) {
        res.send({ statusCode: 401, message: "No está autorizado." });
    }
};
       editBuy = async (req, res) => {
        const { id } = req.params
        const editBuy = req.body
        const buy = await service.editBuy(id, editBuy)
        res.send(buy)
    }
}
  
  export default BuyController;