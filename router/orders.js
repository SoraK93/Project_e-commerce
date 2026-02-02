const express = require("express");
const {
  getCustomerOrder,
  getCustomerOrderById,
  createCustomerOrder,
  updateCustomerOrderById,
  deleteCustomerOrderById,
} = require("../controller/orderController");

const order = express.Router();

order.get("/:customerId", getCustomerOrder);

order.get("/:customerId/:orderId", getCustomerOrderById);

order.post("/:customerId", createCustomerOrder);

order.patch("/:customerId/:orderId", updateCustomerOrderById);

order.delete("/:customerId/:orderId", deleteCustomerOrderById);

module.exports = order;
