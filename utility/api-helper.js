const queryReturnError = require("./api-errors");

// used to generated product and customer patch route query related information
function genPatchRouteQueryList(data, next) {
  const updateFields = [];
  const updateValues = [];

  let index = 0;

  for (let key in data) {
    if (key === "id" || key === "seller_id") {
      return next(
        queryReturnError(`Invalid request: ${key} cannot be updated.`, 400),
      );
    }
    index++;
    updateFields.push(`${key} = $${index}`);
    updateValues.push(data[key]);
  }

  return [updateFields, updateValues];
}

// used by order route to create select query
function createOrderQuery(route, orderId = false) {
  const orderColumns = "quantity, payment_status, payment_mode";
  const productColumns = "products.name, products.price";

  let query;

  switch (route) {
    case "get":
      query = `SELECT ${productColumns}, ${orderColumns} FROM order_details
    INNER JOIN products ON products.id = order_details.product_id
    WHERE order_details.customer_id = $1`;
      if (orderId) {
        query += " AND order_details.id = $2";
      }
      break;
    case "post":
      query = "INSERT INTO order_details VALUES ($1, $2, $3, $4, $5, $6, $7)";
      break;
    case "patch":
      query =
        "UPDATE order_details SET payment_status = $1, payment_mode = $2 \
      WHERE customer_id = $3 AND id = $4";
      break;
    case "delete":
      query = `DELETE FROM order_details WHERE id = $1 AND customer_id = $2 
      RETURNING ${productColumns}, ${orderColumns}`;
      break;
  }

  return query;
}

module.exports = { genPatchRouteQueryList, createOrderQuery };
