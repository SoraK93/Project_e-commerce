const express = require("express");
const pool = require("../model/database");

const order = express.Router();

order.get("/:customerId", (req, res, next) => {
  res.send();
});

order.get("/:customerId/:orderId", (req, res, next) => {
  res.send();
});

order.post("/:customerId", (req, res, next) => {
  res.send();
});

order.patch("/:customerId/:orderId", (req, res, next) => {
  res.send();
});

order.delete("/:customerId/:orderId", (req, res, next) => {
  res.send();
});

module.exports = order;
