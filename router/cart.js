const express = require("express");

const cart = express.Router();

cart.get("/", (req, res, next) => {
  res.send();
});

cart.post("/", (req, res, next) => {
  res.send();
});

cart.patch("/", (req, res, next) => {
  res.send();
});

cart.delete("/", (req, res, next) => {
  res.send();
});

module.exports = cart;
