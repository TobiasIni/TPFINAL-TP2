import ProductsServices from "../services/products.service.js";

class ProductsController {
    constructor() {
      this.services = new ProductsServices();
    }

    getProducts = async (req, res) => {
      const products = await this.services.getProducts();
      res.send(products);
    };
  
    getProductsId = async (req, res) => {
      try {
        const { id } = req.params;
        const product = await this.services.getProductsById(id);
        res.send(product);
      } catch (error) {
        console.log("Error");
        res.send({ statusCode: 401, message: "No está autorizado." });
      }
    };

    newProduct = async (req, res) => {
      try {
        const prod = req.body
        //Podemos tener una capa gruesa de validaciones en el controlador
        if(typeof(prod) === "object"){
          const data = await this.services.newProduct(prod);
          res.send(data);
        }
      } catch (error) {
        res.send({ statusCode: 401, message: "No está autorizado." });
      }
    };
}
  
  export default ProductsController;