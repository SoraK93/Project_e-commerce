const { createCartQuery } = require("../../utility/api-helper");
const { genPatchRouteQueryList } = require("../../utility/api-helper");
const pool = require("../../model/database");
const queryReturnError = require("../utility/api-errors");
const { v4: uuidv4 } = require("uuid");

const dependencies = {
  pool,
  createCartQuery,
  uuidv4,
  genPatchRouteQueryList,
  queryReturnError,
};

module.exports = {
  getCustomerOrder: require("./_getCustomerOrder")(dependencies),
  getCustomerOrderById: require("./_getCustomerOrderById")(dependencies),
  createCustomerOrder: require("./_createCustomerOrder")(dependencies),
  updateCustomerOrderById: require("./_updateCustomerOrderById")(dependencies),
  deleteCustomerOrderById: require("./_deleteCustomerOrderById")(dependencies),
};
