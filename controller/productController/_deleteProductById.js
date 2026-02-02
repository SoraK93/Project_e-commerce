module.exports =
  ({ pool, queryReturnError }) =>
  async (req, res, next) => {
    const productId = req.params.productId;

    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [productId],
    );

    if (result.rowCount === 0) {
      return next(queryReturnError("Product not found", 404));
    }

    res.status(200).send(result);
  };
