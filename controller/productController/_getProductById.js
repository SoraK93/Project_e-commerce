module.exports =
  ({ pool }) =>
  async (req, res, next) => {
    const productId = req.params.productId;

    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      productId,
    ]);

    res.status(200).json(result.rows[0]);
  };
