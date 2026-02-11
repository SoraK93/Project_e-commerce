const express = require("express");
const passport = require("passport");

const { authLogin, authRegister, authLogout } = require("../controller/userController");

const auth = express.Router();

auth.post("/login", passport.authenticate("local"), authLogin);

auth.post("/register", authRegister);

auth.post("/logout", authLogout)

module.exports = auth;
