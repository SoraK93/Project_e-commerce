module.exports = ({pool, createOrderQuery, queryReturnError}) => async (req, res, next) => {
  const customerId = req.params.customerId;
  const orderId = req.params.orderId;

  const orderQuery = createOrderQuery("get", true);
  const result = await pool.query(orderQuery, [customerId, orderId]);

  if (result.rowCount === 0) {
    return next(queryReturnError("No order found."), 404);
  }

  res.json(result.rows);
}