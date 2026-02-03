const bcrypt = require("bcrypt")
const pool = require("../../model/database");
const { v4: uuidv4 } = require("uuid");
const queryReturnError = require("../../utility/api-errors");

const dependencies = { pool, queryReturnError, uuidv4, bcrypt };

module.exports = {
  userLogin: require("./_userLogin")(dependencies),
  userRegister: require("./_userRegister")(dependencies),
};
