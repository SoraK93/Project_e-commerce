module.exports =
  ({ pool, createOrderQuery, genPatchRouteQueryList }) =>
  async (req, res, next) => {
    const customerId = req.params.customerId;
    const orderId = req.params.orderId;

    const [_, updateValues] = genPatchRouteQueryList(req.body);
    const orderQuery = createOrderQuery("patch");

    const result = await pool.query(orderQuery, [
      ...updateValues,
      customerId,
      orderId,
    ]);

    res.status(204).send();
  };
