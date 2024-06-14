import fs from "fs";

class ProductsModelFs {
  constructor() {
    this.products = "products.json";
  }

  getProducts = async () => {
    const data = await fs.promises.readFile(this.products, "utf-8");
    return data;
  };

  getProductsById = async (id) => {
    const data = JSON.parse(await fs.promises.readFile(this.products, "utf-8"));
    const product = await data.find((prod) => prod.id == id);
    return product;
  };

  newProduct = async (prod) => {
    console.log("INICIO ");
    const data = JSON.parse(await fs.promises.readFile(this.products, "utf-8"));
    data.push(prod);
    console.log("data: ", data);
    const newData = JSON.stringify(data);
    console.log("newData: ", newData);
    await fs.promises.writeFile(this.products, newData);
    return prod;
  };
}

export default ProductsModelFs;
