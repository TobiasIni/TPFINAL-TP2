import usersModel from '../models/DAO/usersMongoModel.js'

class UserServices {
    constructor() {
      this.model = new usersModel();
    }
  
    getUsers = async () => {
      const users = await this.model.getUsers();
      return users;
    };

    newUser = async (user) => {
      const users = await this.model.newUser(user);
      return users;
    };

    editUsers = async (id, data) => {
      const user = await this.model.editUsers(id, data)
      return user
    };

    getUserById = async (id) => {
      const user = await this.model.getUsersById(id);
      return user;
    };

    deleteUser = async (id) => {
      const buy = await this.model.deleteUser(id)
      return buy
    };
    
  }
  
  export default UserServices;