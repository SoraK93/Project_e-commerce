module.exports =
  ({ pool, createOrderQuery, queryReturnError }) =>
  async (req, res, next) => {
    const customerId = req.params.customerId;

    const orderQuery = createOrderQuery("get");
    const result = await pool.query(orderQuery, [customerId]);

    if (result.rowCount === 0) {
      return next(queryReturnError("No order found."), 404);
    }

    res.json(result.rows);
  };
