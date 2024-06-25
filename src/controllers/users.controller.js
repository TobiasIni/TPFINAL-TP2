import UserServices from "../services/users.service.js";
import authService from '../services/auth.service.js'

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
      const user = await this.services.editUsers(id, editUsers)
      res.send(user)
    };

    login = (req, res) => {
      const { username, password } = req.body;
      if (username === 'user' && password === 'password') {
        const user = { id: 1, username: 'Tobias', role: 'ADMIN' }; // Ejemplo de usuario
        const token = authService.generateToken(user);
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    };

    deleteUsers = async (req, res) => {
      const { id } = req.params;
      const buy = await this.services.deleteUser(id);
      res.send(buy);
    }
}

export default UsersController;