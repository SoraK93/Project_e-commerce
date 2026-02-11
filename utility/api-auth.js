const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

// import db
const pool = require("../model/database");

const localStrategy = new LocalStrategy(
  { usernameField: "email" },
  function verify(email, password, cb) {
    const query = "SELECT * FROM customers_details WHERE email = $1";

    pool.query(query, [email], (err, result) => {
      if (err) return cb(err);

      if (!result.rowCount) {
        return cb(null, false, {
          message: "Incorrect username or password.",
        });
      }

      const user = result.rows[0];

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return cb(err);

        if (!isMatch) {
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        }

        return cb(null, user);
      });
    });
  },
);

const serialize = (user, done) => {
  done(null, user.id);
};

const deserialize = (id, done) => {
  pool.query(
    "SELECT * FROM customers_details WHERE id = $1",
    [id],
    (err, result) => {
      if (err) return done(err);

      if (!result.rowCount) return done(new Error("User not found"), null);

      done(null, result.rows[0]);
    },
  );
};

const checkRole = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized: Please login" });
  }

  if (req.user.is_seller) {
    return next();
  }

  return res
    .status(403)
    .json({ error: "Forbidden: You do not have permission" });
};

const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({ error: "Unauthorized: Please login" });
};

const checkOwnerShip = (req, res, next) => {
  const customerId = req.params.customerId;
  const currentUser = req.user;

  if (currentUser.id === customerId) {
    return next();
  }

  return res
    .status(403)
    .json({ error: "Forbidden: You do not have permission" });
};

module.exports = {
  localStrategy,
  serialize,
  deserialize,
  checkRole,
  checkLoggedIn,
  checkOwnerShip,
};
