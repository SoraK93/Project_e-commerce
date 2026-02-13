module.exports =
  ({ pool, genPatchRouteQueryList }) =>
  async (req, res, next) => {
    const userId = req.params.userId;

    const [updateFields, updateValues] = genPatchRouteQueryList(req.body, next);

    const result = await pool.query(
      `UPDATE customers_details SET ${updateFields.join(", ")} WHERE id = $${updateValues.length + 1}`,
      [...updateValues, userId],
    );

    res.status(204).end();
  };
