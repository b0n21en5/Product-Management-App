import express from "express";
import {
  addNewProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { validateInput } from "../helpers/validateInput.js";

const router = express.Router();

// add new product route
router.post("/add-product", validateInput, addNewProduct);

// all get routes
router.get("/get-product/:pid", getSingleProduct);
router.get("/get-featured-products", getFeaturedProducts);

// pass query param price or rating for product filtering
router.get("/get-all-products", getAllProducts);

// product update route
router.put("/update-product/:pid", updateProduct);

//product delete route
router.delete("/delete-product/:pid", deleteProduct);

export default router;
