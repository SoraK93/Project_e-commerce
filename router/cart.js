const express = require("express");
const pool = require("../server")

const cart = express.Router();

cart.get("/:customerId", (req, res, next) => {
  res.send();
});

cart.post("/:customerId", (req, res, next) => {
  res.send();
});

cart.patch("/:customerId", (req, res, next) => {
  res.send();
});

cart.delete("/:customerId", (req, res, next) => {
  res.send();
});

module.exports = cart;
