const express = require("express");
const {
  getCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
} = require("../controller/customerController");
const { checkOwnerShip } = require("../utility/api-auth");

const customer = express.Router();

customer.get("/", checkOwnerShip, getCustomers);

customer.get("/:customerId", checkOwnerShip, getCustomerById);

customer.patch("/:customerId", checkOwnerShip, updateCustomerById);

customer.delete("/:customerId", checkOwnerShip, deleteCustomerById);

module.exports = customer;
