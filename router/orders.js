const express = require("express");

const order = express.Router();

order.get("/", (req, res, next) => {
  res.send();
});

order.post("/", (req, res, next) => {
  res.send();
});

order.patch("/", (req, res, next) => {
  res.send();
});

order.delete("/", (req, res, next) => {
  res.send();
});

module.exports = order;
