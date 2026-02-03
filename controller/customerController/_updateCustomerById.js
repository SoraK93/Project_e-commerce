module.exports =
  ({ pool, genPatchRouteQueryList }) =>
  async (req, res, next) => {
    const customerId = req.params.customerId;

    const [updateFields, updateValues] = genPatchRouteQueryList(req.body, next);

    const result = await pool.query(
      `UPDATE customers_details SET ${updateFields.join(", ")} WHERE id = $${updateValues.length + 1}`,
      [...updateValues, customerId],
    );

    res.status(204).end();
  };
