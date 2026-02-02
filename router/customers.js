const express = require("express");
const pool = require("../model/database");
const queryReturnError = require("../utility/api-errors");
const genPatchRouteQueryList = require("../utility/api-helper");

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

customer.get("/:customerId", async (req, res, next) => {
  const customerId = req.params.customerId;

  const result = await pool.query(
    "SELECT name, phone, email, address FROM customers_details WHERE id = $1",
    [customerId],
  );

  if (result.rowCount === 0) {
    return next(queryReturnError("Invalid request.", 400));
  }

  res.status(200).json(result.rows[0]);
});

customer.post("/", (req, res, next) => {
  // const { name, phone, email, password, address } = req.body;

  res.send();
});

customer.patch("/:customerId", async (req, res, next) => {
  const customerId = req.params.customerId;

  const [updateFields, updateValues] = genPatchRouteQueryList(req.body, next);

  const result = await pool.query(
    `UPDATE customers_details SET ${updateFields.join(", ")} WHERE id = $${updateValues.length + 1}`,
    [...updateValues, customerId],
  );

  res.status(204);
});

customer.delete("/:customerId", async (req, res, next) => {
  const customerId = req.params.customerId;

  const result = await pool.query(
    "DELETE FROM customers_details WHERE id = $1 RETURNING name, phone, email, address",
    [customerId],
  );

  if (result.rowCount === 0) {
    return next(queryReturnError("Invalid Id. Customer not found.", 404));
  }

  res.status(200).json(result.rows[0]);
});

module.exports = customer;
