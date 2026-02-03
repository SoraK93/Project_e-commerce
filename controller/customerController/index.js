const pool = require("../../model/database");
const queryReturnError = require("../../utility/api-errors");
const genPatchRouteQueryList = require("../../utility/api-helper");

const dependencies = { pool, queryReturnError, genPatchRouteQueryList };

module.exports = {
  getCustomers: require("./_getCustomers")(dependencies),
  getCustomerById: require("./_getCustomerById")(dependencies),
  updateCustomerById: require("./_updateCustomerById")(dependencies),
  deleteCustomerById: require("./_deleteCustomerById")(dependencies),
};
