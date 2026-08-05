const express = require("express");
const {
  getCustomerOrder,
  getCustomerOrderById,
  createCustomerOrder,
  updateCustomerOrderById,
  deleteCustomerOrderById,
} = require("../controller/orderController");
const { checkLoggedIn } = require("../utility/api-auth");

const order = express.Router();

order.get("/", checkLoggedIn, getCustomerOrder);

order.get("/:orderId", checkLoggedIn, getCustomerOrderById);

order.post("/", checkLoggedIn, createCustomerOrder);

order.patch("/:orderId", checkLoggedIn, updateCustomerOrderById);

order.delete("/:orderId", checkLoggedIn, deleteCustomerOrderById);

module.exports = order;
