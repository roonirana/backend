import express from "express"; 
import { createNewProduct, deleteProductByName, getProductByName, getProducts, getProductsByUserId, updateProductByName } from "../controllers/product.js";

const productRoute = express.Router();

productRoute.post("/addProduct", createNewProduct);
productRoute.get("/getAllProducts", getProducts);
productRoute.get("/getProduct/:name", getProductByName);
productRoute.delete("/deleteProduct/:name", deleteProductByName);
productRoute.put("/updateProduct/:name", updateProductByName);
productRoute.get("/getProductByUserid/:id", getProductsByUserId);



export default productRoute;