const express = require("express");
const {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controller/userController");
const { checkOwnerShip, checkLoggedIn } = require("../utility/api-auth");

const user = express.Router();

user.get("/", checkLoggedIn, getUsers);

user.get("/:userId", checkOwnerShip, getUserById);

user.patch("/:userId", checkOwnerShip, updateUserById);

user.delete("/:userId", checkOwnerShip, deleteUserById);

module.exports = user;
