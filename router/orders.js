const express = require("express");
const pool = require("../model/database");
const queryReturnError = require("../utility/api-errors");
const {
  createOrderQuery,
  genPatchRouteQueryList,
} = require("../utility/api-helper");
const { v4: uuidv4 } = require("uuid");

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

order.post("/:customerId", async (req, res, next) => {
  const c_Id = req.params.customerId;
  const {
    product_id: p_id,
    quantity,
    payment_status: pay_status,
    payment_mode: pay_mode,
  } = req.body;

  const id = uuidv4();
  const ordered_on = new Date().toLocaleString();

  const orderQuery = createOrderQuery("post");
  const value = [id, p_id, c_Id, quantity, pay_status, pay_mode, ordered_on];

  const result = await pool.query(orderQuery, value);

  res.status(201).json({ message: "Create successfuly" });
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
