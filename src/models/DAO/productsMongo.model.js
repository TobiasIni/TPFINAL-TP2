import MongoConnection from "../DAO/mongoConnection.js"


class ProductsModelMongoDB {
    constructor() {

    }

    getProducts = async () => {
      //FIX: añadir método find()
      const products = await MongoConnection.db.collection("products").find({}).toArray()
      return products;
    };
  
    getProductsById = async (id) => {

    };

    newProduct = async (prod) => {
      const newProduct = await MongoConnection.db.collection("products").insertOne(prod);
      return newProduct
    };

    editProduct = async (id) => {
      const updatedProduct = await Product.findOneAndUpdate({ id: id }, data, { new: true });
  
      if (!updatedProduct) {
        throw { statusCode: 404, message: 'Producto inexistente.' };
      }
      
      return updatedProduct;
    }

   deleteProduct = async (id) => {

      // Eliminar el producto
      const result = await MongoConnection.db.collection("products").deleteOne({_id: objectId(id
        
      )});
    
      // Validar que el producto existía y fue eliminado
      if (!result.value) {
        throw { statusCode: 404, message: 'Producto inexistente.' };
      }
      // Devolver resultado
      return { Resultado: "Producto eliminado correctamente.", productoBorrado: result.value };
    };
  }
  
  export default ProductsModelMongoDB;