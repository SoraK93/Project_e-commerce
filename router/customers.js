const express = require("express");
const {
  getCustomers,
  getCustomerById,
  createNewCustomer,
  updateCustomerById,
  deleteCustomerById,
} = require("../controller/customerController");

const customer = express.Router();

customer.get("/", getCustomers);

customer.get("/:customerId", getCustomerById);

// customer.post("/", createNewCustomer);

customer.patch("/:customerId", updateCustomerById);

customer.delete("/:customerId", deleteCustomerById);

module.exports = customer;
