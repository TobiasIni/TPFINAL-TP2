import MongoConnection from "../DAO/mongoConnection.js"
import { ObjectId } from "mongodb";


class UsersModelMongoDB {
    constructor() {

    }
    getUsers = async () => {
      //Uso del metodo Find() para encontrar los datos de products
      const users = await MongoConnection.db.collection("users").find({}).toArray()
      //lista de productos
      return users;
    };
  
    getUsersById = async (id) => {
      const users = await MongoConnection.db.collection("users").find({}).toArray()
      //busco un producto por id
      const newUser = users.find((element)=>element.id ==id)
      
      return newUser || "producto inexistente."
    };

    newUser = async (user) => {
      const users = await MongoConnection.db.collection("users").find({}).toArray()
      //le doy una ID al nuevo producto
      user.id = users.length + 1;
      //agrego el producto a la base de datos
      const newUser = await MongoConnection.db.collection("users").insertOne(user);
      return newUser
    };

    editUser = async (id, data) => {
      const users = await MongoConnection.db.collection("users").find({}).toArray()
      //Busco un elemento por id y le cargo nuevos datos y lo actualizo 
      const updatedUser = await MongoConnection.db.collection("users").findOneAndUpdate({ id: id }, {$set: data}, { returnOriginal: false });
      // Valido que el producto exista
      if (!updatedUser) {
        throw { statusCode: 404, message: 'Usuario inexistente.' };
      }
      
      return updatedUser;
    }

   deleteUser = async (user) => {
      // Eliminar el producto
      const deletedUser = await MongoConnection.db.collection("users").deleteOne(user);
      // Validar que el producto existía y fue eliminado
      if (!deletedUser.deletedCount) {
        throw new Error(`Usuario no encontrado`);
      }
      // Devolver resultado
      return { Resultado: "Usuario eliminado correctamente.", deletedUser};
    };

    
  }
  
  export default UsersModelMongoDB;