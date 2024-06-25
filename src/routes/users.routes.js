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
      this.router.put("/users/:id", this.controller.editUsers)
      this.router.delete("/users/:id", this.controller.deleteUsers)

      return this.router;
    }
  }
  
  export default Router;