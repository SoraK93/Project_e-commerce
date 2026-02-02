const { createCartQuery } = require("../../utility/api-helper");
const pool = require("../../model/database");

const dependencies = { pool, createCartQuery };

module.exports = {
  getAllCart: require("./_getAllCart")(dependencies),
  createNewCart: require("./_createNewCart"),
  updateCart: require("./_updateCart"),
  deleteCartItem: require("./_deleteCartItem")(dependencies),
};
