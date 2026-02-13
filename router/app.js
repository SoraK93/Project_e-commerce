// import packages
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const passport = require("passport");

// import main api route
const userRouter = require("./users");
const cartRouter = require("./cart");
const productRouter = require("./products");
const orderRouter = require("./orders");
const authRouter = require("./auth");
const {
  localStrategy,
  serialize,
  deserialize,
  checkLoggedIn,
} = require("../utility/api-auth");

dotenv.config({ quiet: true });

const app = express();

passport.use(localStrategy);

passport.serializeUser(serialize);

passport.deserializeUser(deserialize);

// app middleware
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(
  session({
    secret: process.env.S_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// route middleware
app.use("/product", productRouter);
app.use("/order", checkLoggedIn, orderRouter);
app.use("/customer", userRouter);
app.use("/cart", checkLoggedIn, cartRouter);
app.use("/auth", authRouter);


// Error handling
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal server error" });
});

module.exports = app;
