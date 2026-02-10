const bcrypt = require("bcrypt")
const pool = require("../../model/database");
const { v4: uuidv4 } = require("uuid");
const queryReturnError = require("../../utility/api-errors");

const dependencies = { pool, queryReturnError, uuidv4, bcrypt };

module.exports = {
  authLogin: require("./_authLogin")(dependencies),
  authRegister: require("./_authRegister")(dependencies),
};
