import express from "express";

import {
  createProduct,
  getProducts,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.delete(
  "/:id",
  deleteProduct
);

export default router;

