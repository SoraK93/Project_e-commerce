const express = require("express");
const { userLogin, userRegister } = require("../controller/userController");

const user = express.Router();

user.get("/login", userLogin)

user.post("/register", userRegister)

module.exports = user