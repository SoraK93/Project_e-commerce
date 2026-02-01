const express = require("express");
const pool = require("../model/database");

const customer = express.Router();

customer.get("/", async (req, res, next) => {
  const result = await pool.query("SELECT * FROM customers_details");

  if (result.rowCount === 0) {
    const err = new Error("No registered customers found.");
    err.status = 404
    return next(err)
  }

  res.send(result.rows);
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
