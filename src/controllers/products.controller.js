import productsServices from "../services/products.service.js";

class ProductsController {
    constructor() {
      this.services = productsServices;
    }

    getProducts = async (req, res) => {
      const products = await this.services.getProducts();
      res.send(products);
    };
  
    getProductId = async (req, res) => {
      const { id } = req.params;
      const product = await this.services.getProductsById(id);
      res.send(product);
    };

    newProduct = async (req, res) => {
      try {
        const product = req.body
        //const token = req.headers['authtoken'];
        //TODO: Agregar la validacion de roles llamando al user.Constrolelrs para que valide si el token
        // pertenece a algun usuario valido y si tiene permisos de usar este metodo
  
        const data = await this.services.newProduct(product);
        res.send(data);
      } catch (error) {
        res.status(error.statusCode || 500).json({ Error: error.message });
      }
    };

    editProduct = async (req, res) => {
      try {
        const { id } = req.params;
        const editProduct = req.body;
        const product = await this.services.editProduct(id, editProduct);
        res.send(product);
      } catch (error) {
        res.status(error.statusCode || 500).json({ Error: error.message });
      }
    };

    deleteProducts = async (req, res) => {
      try{
        const { id } = req.params;
        const product = await this.services.deleteProduct(id);
        res.send(product);
      } catch (error) {
      res.status(error.statusCode || 500).json({ Error: error.message });
    }
    }
}
  
export default ProductsController;