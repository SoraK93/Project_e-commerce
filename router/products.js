const express = require("express");
const pool = require("../model/database");
const { v4: uuidv4 } = require("uuid");
const queryReturnError = require("../utility/api-errors");
const { genPatchRouteQueryList } = require("../utility/api-helper");

const product = express.Router();

// requests all products in the database
product.get("/", async (req, res, next) => {
  const result = await pool.query("SELECT * FROM products");
  res.send(result.rows);
});

// request for a specific product in the database
product.get("/:productId", async (req, res, next) => {
  const productId = req.params.productId;

  const result = await pool.query("SELECT * FROM products WHERE id = $1", [
    productId,
  ]);

  res.status(200).json(result.rows[0]);
});

// creates a new product
product.post("/", async (req, res, next) => {
  const { name, description, in_stock, price } = req.body;
  const id = uuidv4();
  const seller_id = uuidv4();

  const result = await pool.query(
    "INSERT INTO products VALUES ($1, $2, $3, $4, $5, $6)",
    [id, name, description, in_stock, price, seller_id],
  );
  res.status(201).json({ message: "create successful" });
});

// request update for a specific product in database
product.patch("/:productId", async (req, res, next) => {
  const productId = req.params.productId;

  const [updateFields, updateValues] = genPatchRouteQueryList(req.body, next);

  const result = await pool.query(
    `UPDATE products SET ${updateFields.join(", ")} WHERE id = $${updateValues.length + 1}`,
    [...updateValues, productId],
  );

  res.status(204).json({ message: "update successful" });
});

product.delete("/:productId", async (req, res, next) => {
  const productId = req.params.productId;

  const result = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [productId],
  );

  if (result.rowCount === 0) {
    return next(queryReturnError("Product not found", 404));
  }

  res.status(200).send(result);
});

module.exports = product;
