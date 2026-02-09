const express = require("express");
const {
  getAllCart,
  deleteCartItem,
  createNewCart,
  updateCart,
} = require("../controller/cartController/index");

const cart = express.Router();

cart.get("/:customerId", getAllCart);

// cart.post("/:customerId", createNewCart);

// cart.patch("/:customerId", updateCart);

cart.delete("/:customerId", deleteCartItem);

module.exports = cart;
