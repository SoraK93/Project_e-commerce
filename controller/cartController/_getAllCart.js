module.exports =
  ({ pool, createCartQuery }) =>
  async (req, res, next) => {
    const customerId = req.params.customerId;

    const cartQuery = createCartQuery("get");
    const result = await pool.query(cartQuery, [customerId]);

    res.status(200).json(result.rows);
  };
