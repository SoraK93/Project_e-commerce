const express = require("express");

const customer = express.Router();

customer.get("/", (req, res, next) => {
  res.send();
});

customer.post("/", (req, res, next) => {
  res.send();
});

customer.patch("/", (req, res, next) => {
  res.send();
});

customer.delete("/", (req, res, next) => {
  res.send();
});

module.exports = customer;
