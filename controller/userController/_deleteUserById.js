module.exports =
  ({ pool, queryReturnError }) =>
  async (req, res, next) => {
    const userId = req.params.userId;

    const result = await pool.query(
      "DELETE FROM customers_details WHERE id = $1 RETURNING name, phone, email, address",
      [userId],
    );

    if (result.rowCount === 0) {
      return next(queryReturnError("Invalid Id. Customer not found.", 404));
    }

    res.status(200).json(result.rows[0]);
  };
