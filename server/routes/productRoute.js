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
import { verifyToken } from "../helpers/VerifyAuthentication.js";

const router = express.Router();

// add new product route
router.post("/add-product", validateInput, verifyToken, addNewProduct);

// all get routes
router.get("/get-product/:pid", verifyToken, getSingleProduct);
router.get("/get-featured-products", verifyToken, getFeaturedProducts);

// pass query param price or rating for product filtering
router.get("/get-all-products", verifyToken, getAllProducts);

// product update route
router.put("/update-product/:pid", verifyToken, updateProduct);

//product delete route
router.delete("/delete-product/:pid", verifyToken, deleteProduct);

export default router;
