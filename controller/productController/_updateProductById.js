module.exports =
  ({ pool, genPatchRouteQueryList }) =>
  async (req, res, next) => {
    const productId = req.params.productId;

    const [updateFields, updateValues] = genPatchRouteQueryList(req.body, next);

    const result = await pool.query(
      `UPDATE products SET ${updateFields.join(", ")} WHERE id = $${updateValues.length + 1}`,
      [...updateValues, productId],
    );

    res.status(204).json({ message: "update successful" });
  };
