const express = require("express");
const {
  getProducts,
  getProductById,
  createNewProduct,
  updateProductById,
  deleteProductById,
} = require("../controller/productController");
const { checkRole } = require("../utility/api-auth");

const product = express.Router();

// requests all products in the database
product.get("/", getProducts);

// request for a specific product in the database
product.get("/:productId", getProductById);

// creates a new product
product.post("/", checkRole, createNewProduct);

// request update for a specific product in database
product.patch("/:productId", checkRole, updateProductById);

product.delete("/:productId", checkRole, deleteProductById);

module.exports = product;
