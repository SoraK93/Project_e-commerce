const express = require("express");
import pool from "../model/database"

const product = express.Router();

product.get("/", (req, res, next) => {
  res.send();
});

product.get("/:productId", (req, res, next) => {
  res.send();
});

product.post("/", (req, res, next) => {
  res.send();
});

product.patch("/", (req, res, next) => {
  res.send();
});

product.delete("/:productId", (req, res, next) => {
  res.send();
});

module.exports = product;
