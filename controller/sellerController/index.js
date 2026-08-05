const pool = require("../../model/database");
const { v4: uuidv4 } = require("uuid");
const queryReturnError = require("../../utility/api-errors");
const { genPatchRouteQueryList } = require("../../utility/api-helper");

const dependencies = { pool, genPatchRouteQueryList, queryReturnError, uuidv4 };

module.exports = {
  getSellerById: require("./_getSellerById")(dependencies),
  getProductBySellerId: require("./_getProductsBySellerId")(dependencies),
};
