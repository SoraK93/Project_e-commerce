const express = require("express");
const {
  getProducts,
  getProductById,
  createNewProduct,
  updateProductById,
  deleteProductById,
} = require("../controller/productController");

const product = express.Router();

// requests all products in the database
product.get("/", getProducts);

// request for a specific product in the database
product.get("/:productId", getProductById);

// creates a new product
product.post("/", createNewProduct);

// request update for a specific product in database
product.patch("/:productId", updateProductById);

product.delete("/:productId", deleteProductById);

module.exports = product;
