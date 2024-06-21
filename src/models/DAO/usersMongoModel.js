import MongoConnection from "../DAO/mongoConnection.js"
import { ObjectId } from "mongodb";


class UsersModelMongoDB {
    constructor() {

    }

    getUsers = async () => {
      //FIX: añadir método find()
      const products = await MongoConnection.db.collection("users").find({}).toArray()
      return products;
    };
  
    getUserById = async (id) => {

    };

    newUser = async (user) => {
      const newUser = await MongoConnection.db.collection("users").insertOne(user);
      return newUser
    };

    editUser = async (id) => {
      const updatedUser = await MongoConnection.db.findOneAndUpdate({ id: id }, data, { new: true });
  
      if (!updatedUser) {
        throw { statusCode: 404, message: 'Usuario inexistente.' };
      }
      
      return updatedUser;
    }

   deleteUser = async ({id}) => {

    var objectId = new ObjectId({id})
      // Eliminar el producto
      const result = await MongoConnection.db.collection("users").deleteOne({"_id": objectId});
    
      // Validar que el producto existía y fue eliminado
      if (!result.value) {
        throw { statusCode: 404, message: 'Usuario inexistente.' };
      }
      // Devolver resultado
      return { Resultado: "Usuario eliminado correctamente.", usuarioBorrado: result.value };
    };
  }
  
  export default UsersModelMongoDB;