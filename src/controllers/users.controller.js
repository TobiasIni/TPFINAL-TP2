import UserServices from "../services/users.service.js";

class UsersController {
    constructor() {
      this.services = new UserServices();
    }

    getUsers = async (req, res) => {
      const users = await this.services.getUsers();
      res.send(users);
    };

    getUserById = async (req,res) => {
      const {id} = req.params
      const user = await this.services.getUserById(id);
      res.send(user)
    }

    newUser = async (req, res) => {
      try {
        const user = req.body
        //Podemos tener una capa gruesa de validaciones en el controlador
        const data = await this.services.newUser(user)
      res.send(data)
      } catch (error) {
        res.status(error.statusCode || 500).json({Error: error.message})
      }
      };
      
       editUsers = async (req, res) => {
        const { id } = req.params
        const editUsers = req.body
        const user = await service.editUsers(id, editUsers)
        res.send(user)
    };
}
  
  export default UsersController;