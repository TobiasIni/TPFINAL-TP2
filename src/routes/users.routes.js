import UsersController from "../controllers/users.controller.js";
import express from 'express';

class Router {
    constructor() {
      this.router = express.Router();
      this.controller = new UsersController();
    }
  
    start() {
      this.router.get("/users", this.controller.getUsers);
      this.router.get("/users/:id", this.controller.getUserById);
      this.router.post("/users", this.controller.newUser);
      this.router.put("/users", this.controller.editUsers)

      return this.router;
    }
  }
  
  export default Router;