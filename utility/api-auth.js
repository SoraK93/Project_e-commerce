const passport = require("passport");
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

      result = result.rows[0];
      const data = {
        id: result.id,
        name: result.name,
        phone: result.phone,
        address: result.address,
        is_seller: result.is_seller,
      };

      done(null, data);
    },
  );
};

const checkRole = (req, res, next) => {
  if (req.user.is_seller) {
    return next();
  }

  return res
    .status(403)
    .json({ message: "Forbidden: You do not have permission" });
};

const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  
  return res.status(401).json({ message: "Unauthorized: Please login" });
};

const checkOwnerShip = (req, res, next) => {
  const userId = req.body.id;
  const currentUser = req.user;

  if (currentUser.id === userId) {
    return next();
  }

  return res
    .status(403)
    .json({ message: "Forbidden: You do not have permission" });
};

const authenticateLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ message: "Internal Server Error" });

    if (!user) {
      return res.status(401).json({
        message: info?.message || "Incorrect email or password provided",
      });
    }

    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login Error" });

      return next();
    });
  })(req, res, next);
};

module.exports = {
  localStrategy,
  serialize,
  deserialize,
  checkRole,
  checkLoggedIn,
  checkOwnerShip,
  authenticateLogin
};
