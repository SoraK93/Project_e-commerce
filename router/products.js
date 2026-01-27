const express = require("express");

const product = express.Router();

product.get("/", (req, res, next) => {
  res.send();
});

product.post("/", (req, res, next) => {
  res.send();
});

product.patch("/", (req, res, next) => {
  res.send();
});

product.delete("/", (req, res, next) => {
  res.send();
});

module.exports = product;
