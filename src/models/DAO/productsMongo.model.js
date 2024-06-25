import MongoConnection from "../DAO/mongoConnection.js"



class ProductsModelMongoDB {
    constructor() {
       
    }

    getProducts = async () => {
      //Uso del metodo Find() para encontrar los datos de products
      const products = await MongoConnection.db.collection("products").find({}).toArray()
      //lista de productos
      return products;
    };
  
    getProductsById = async (id) => {
      const products = await MongoConnection.db.collection("products").find({}).toArray()
      //busco un producto por id
      const product = products.find((element)=>element.id ==id)
      
      return product || "producto inexistente."
    };

    newProduct = async (prod) => {
      const products = await MongoConnection.db.collection("products").find({}).toArray()
      //le doy una ID al nuevo producto
      prod.id = products.length + 1;
      //agrego el producto a la base de datos
      const newProduct = await MongoConnection.db.collection("products").insertOne(prod);
      return newProduct
    };

    editProduct = async (id, data) => {
      const products = await MongoConnection.db.collection("products").find({}).toArray()
      //Elimino _id para poder editar
      delete data._id;
      //Busco un elemento por id y le cargo nuevos datos y lo actualizo 
      const updatedProduct = await MongoConnection.db.collection("products").findOneAndUpdate({ id: id }, {$set: data}, { returnOriginal: false });
      // Valido que el producto exista
      if (!updatedProduct) {
        throw { statusCode: 404, message: 'Producto inexistente.' };
      }
      
      return updatedProduct;
    }

   deleteProduct = async (product) => {
      // Eliminar el producto
      const deletedProduct = await MongoConnection.db.collection("products").deleteOne(product);
      // Validar que el producto existía y fue eliminado
      if (!deletedProduct.deletedCount) {
        throw new Error(`Producto no encontrado`);
      }
      // Devolver resultado
      return { Resultado: "Producto eliminado correctamente.", deletedProduct};
    };

    
  }
  
  export default ProductsModelMongoDB;