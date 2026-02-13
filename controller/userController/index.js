const pool = require("../../model/database");
const queryReturnError = require("../../utility/api-errors");
const genPatchRouteQueryList = require("../../utility/api-helper");

const dependencies = { pool, queryReturnError, genPatchRouteQueryList };

module.exports = {
  getUsers: require("./_getUsers")(dependencies),
  getUserById: require("./_getUserById")(dependencies),
  updateUserById: require("./_updateUserById")(dependencies),
  deleteUserById: require("./_deleteUserById")(dependencies),
};
