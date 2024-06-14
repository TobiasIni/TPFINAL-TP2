class BuyModel {
    constructor() {
      this.buys = [];
    }

    getBuy = async () => {
      return this.buys;
    };

    newBuy = async (buy) => {
      const data = await this.buys.push(buy)
      return data;
    };
    
     editBuy = async (id, data) => {
        data.id = id
        const index = this.buys.findIndex((e) => e.id == id)
        buys.splice(index, 1, data)
        return data
    }
  }

  export default BuyModel;