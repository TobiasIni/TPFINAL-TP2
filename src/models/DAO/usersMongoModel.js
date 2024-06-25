import MongoConnection from "../DAO/mongoConnection.js"
import { newUserSchema, editUserSchema } from '../../schemas/users.schema.js';


class UsersModelMongoDB {
    constructor() {
      this.myCollection = "users"
    }
    getUsers = async () => {
      //Uso del metodo Find() para encontrar los datos de products
      const users = await MongoConnection.db.collection(this.myCollection).find({}).toArray()

      users.forEach(user => {
        delete user._id;
      });

      return users;
    };
  
    getUsersById = async (id) => {
      const users = await MongoConnection.db.collection(this.myCollection).find({}).toArray()
      //busco un producto por id
      const newUser = users.find((element)=>element.id ==id)
      if(!newUser){
        throw { statusCode: 404, message: 'Usuario inexistente' };
      }
      return newUser;
    };

    newUser = async (user) => {
      //Valido usando el esquema
      const { error } = newUserSchema.validate(user);
      if (error) {
          const errorMessage = error.details.map(detail => detail.message).join(', ');
          throw { statusCode: 400, message: `Error en el modelo de dato del usario: ${errorMessage}` };
      }

      const users = await MongoConnection.db.collection(this.myCollection).find({}).toArray()
      //le doy una ID al nuevo producto
      user.id = users.length + 1;
      //agrego el producto a la base de datos
      const result = await MongoConnection.db.collection(this.myCollection).insertOne(user);
      const newUser = await MongoConnection.db.collection(this.myCollection).findOne({ _id: result.insertedId });
      delete newUser._id;
      return newUser
    };

    editUsers = async (id, data) => {
      try {
        // Me aseguro que sea un int
        const intId = parseInt(id, 10);
        data.id = intId;
    
        // Valido usando el esquema
        const { error } = editUserSchema.validate(data);
        if (error) {
          const errorMessage = error.details.map(detail => detail.message).join(', ');
          throw { statusCode: 400, message: `Error en el modelo del usuario: ${errorMessage}` };
        }
    
        // Busco un elemento por id y le cargo nuevos datos y lo actualizo
        const result = await MongoConnection.db.collection('usuarios').findOneAndUpdate(
          { id: intId },
          { $set: data },
          { returnDocument: 'after' }
        );
    
        // Valido que el usuario exista
        if (!result || !result.value) {
          throw { statusCode: 404, message: 'Usuario inexistente.' };
        }
    
        delete result.value._id;
        return result.value;
      } catch (err) {
        // Lanza el error para que sea manejado por el controlador
        throw err;
      }
    };
    

   deleteUser = async (userId) => {
      //Me aseguro que sea un int
      const userIntId = parseInt(userId, 10);

      //Obtengo el objeto
      const user = await this.getUsersById(userIntId);

      //Elimino la compra
      const deletedUser = await MongoConnection.db.collection(this.myCollection).deleteOne(user);

      //Valido que el producto existía y fue eliminado
      if (!deletedUser.deletedCount) {
          throw { statusCode: 404, message: 'Usuario inexistente.' };
      }
      delete user._id
      return { Resultado: 'Usuario eliminado correctamente.', UsuarioEliminado: user };
    };
  }
  
  export default UsersModelMongoDB;