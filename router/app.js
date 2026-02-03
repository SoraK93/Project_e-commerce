// import packages
const express = require("express");
const dotenv = require("dotenv");

// import main api route
const customerRouter = require("./customers");
const cartRouter = require("./cart");
const productRouter = require("./products");
const orderRouter = require("./orders");
const userRouter = require("./users");

dotenv.config({ quiet: true });

const app = express();

// app middleware
app.use(express.json());

// route middleware
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/customer", customerRouter);
app.use("/cart", cartRouter);
app.use("/user", userRouter);

// Error handling
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal server error" });
});

module.exports = app;
