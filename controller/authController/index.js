const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require("uuid");

const pool = require("../../model/database");
const queryReturnError = require("../../utility/api-errors");

const dependencies = { pool, queryReturnError, uuidv4, bcrypt };

module.exports = {
  authLogin: require("./_authLogin"),
  authRegister: require("./_authRegister")(dependencies),
  authLogout: require("./_authLogout"),
};
