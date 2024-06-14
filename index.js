import express from "express";
import ProductsRouter from "./src/routes/products.routes.js";
import UsersRouter from './src/routes/users.routes.js'
import BuyRouter from './src/routes/buy.routes.js'


const app = express();
const PORT = 8080;

app.use(express.json()); //traer info del req.body
app.use(express.urlencoded({ extended: true })); //req.params

app.use("/", new ProductsRouter().start());
app.use("/", new UsersRouter().start())
app.use("/", new BuyRouter().start())

app.listen(PORT, () => console.log(`Server listening on: ${PORT}`));
app.on("error", (error) => console.log(`ERROR: ${error}`));
