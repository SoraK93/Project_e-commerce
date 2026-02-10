// import packages
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");

// import main api route
const customerRouter = require("./customers");
const cartRouter = require("./cart");
const productRouter = require("./products");
const orderRouter = require("./orders");
const authRouter = require("./auth");

dotenv.config({ quiet: true });

const app = express();

// app middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// route middleware
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/customer", customerRouter);
app.use("/cart", cartRouter);
app.use("/auth", authRouter);

// Error handling
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal server error" });
});

module.exports = app;
