const express = require("express");
const pool = require("../model/database");
const queryReturnError = require("../utility/api-errors");
const {
  createOrderQuery,
  genPatchRouteQueryList,
} = require("../utility/api-helper");

const order = express.Router();

order.get("/:customerId", async (req, res, next) => {
  const customerId = req.params.customerId;

  const orderQuery = createOrderQuery("get");
  const result = await pool.query(orderQuery, [customerId]);

  if (result.rowCount === 0) {
    return next(queryReturnError("No order found."), 404);
  }

  res.json(result.rows);
});

order.get("/:customerId/:orderId", async (req, res, next) => {
  const customerId = req.params.customerId;
  const orderId = req.params.orderId;

  const orderQuery = createOrderQuery("get", true);
  const result = await pool.query(orderQuery, [customerId, orderId]);

  if (result.rowCount === 0) {
    return next(queryReturnError("No order found."), 404);
  }

  res.json(result.rows);
});

order.post("/:customerId", (req, res, next) => {
  const customerId = req.params.customerId;
  res.send();
});

order.patch("/:customerId/:orderId", async (req, res, next) => {
  const customerId = req.params.customerId;
  const orderId = req.params.orderId;

  const [_, updateValues] = genPatchRouteQueryList(req.body);
  const orderQuery = createOrderQuery("patch");


  const result = await pool.query(orderQuery, [
    ...updateValues,
    customerId,
    orderId,
  ]);

  console.log("done");

  res.status(204).send();
});

order.delete("/:customerId/:orderId", async (req, res, next) => {
  const customerId = req.params.customerId;
  const orderId = req.params.orderId;

  const orderQuery = createOrderQuery("delete");
  const result = await pool.query(orderQuery, [customerId, orderId]);

  if (result.rowCount === 0) {
    return next(queryReturnError("No order found."), 404);
  }

  res.json(result.rows[0]);
});

module.exports = order;
