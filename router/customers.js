const express = require("express");
const pool = require("../model/database");
const queryReturnError = require("../utility/api-errors");

const customer = express.Router();

customer.get("/", async (req, res, next) => {
  const result = await pool.query(
    "SELECT name, phone, email, address FROM customers_details",
  );

  if (result.rowCount === 0) {
    return next(queryReturnError("No registered customers found.", 404));
  }

  res.status(200).json(result.rows);
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

customer.delete("/:customerId", async (req, res, next) => {
  const customerId = req.params.customerId;

  const result = await pool.query(
    "DELETE FROM customers_details WHERE id = $1 RETURNING *",
    [customerId],
  );

  if (result.rowCount === 0) {
    return next(queryReturnError("Invalid Id. Customer not found.", 404));
  }

  res.status().json();
});

module.exports = customer;
