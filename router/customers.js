const express = require("express");
const {pool} = require("../model/database");

const customer = express.Router();

customer.get("/", (req, res, next) => {
  res.send();
});

customer.get("/:customerId", (req, res, next) => {
  res.send();
});

customer.post("/", (req, res, next) => {
  res.send();
});

customer.patch("/", (req, res, next) => {
  res.send();
});

customer.delete("/:customerId", (req, res, next) => {
  res.send();
});

module.exports = customer;
