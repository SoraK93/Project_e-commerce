module.exports =
  ({ pool, createCartQuery }) =>
  async (req, res, next) => {
    const customerId = req.params.customerId;
    const productId = req.params.productId;

    const cartQuery = createCartQuery("delete");
    const result = await pool.query(cartQuery, [customerId, productId]);

    res.status(200).send();
  };
