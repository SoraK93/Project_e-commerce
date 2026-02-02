const pool = require("../model/database");
const { v4: uuidv4 } = require("uuid");
const queryReturnError = require("../utility/api-errors");
const { genPatchRouteQueryList } = require("../utility/api-helper");

const dependencies = { pool, genPatchRouteQueryList, queryReturnError, uuidv4 };

module.exports = {
  getProducts: require("./_getProducts")(dependencies),
  getProductById: require("./_getProductById")(dependencies),
  createNewProduct: require("./_createNewProduct")(dependencies),
  updateProductById: require("./_updateProductById")(dependencies),
  deleteProductById: require("./_deleteProductById")(dependencies),
};
