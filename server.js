// import packages
const express = require("express");
const dotenv = require("dotenv");

// import main api route
const productRouter = require("./router/products");
const orderRouter = require("./router/orders");
const customerRouter = require("./router/customers");
const cartRouter = require("./router/cart");

dotenv.config({ quiet: true });

const app = express();

const port = process.env.SERVER_PORT;

// app middleware
app.use(express.json());

// route middleware
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/customer", customerRouter);
app.use("/cart", cartRouter);

// Error handling
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal server error" });
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Listening to PORT: ${port}`);
});
