const express = require("express");
const { authLogin, authRegister } = require("../controller/userController");

const auth = express.Router();

auth.get("/login", authLogin)

auth.post("/register", authRegister)

module.exports = auth