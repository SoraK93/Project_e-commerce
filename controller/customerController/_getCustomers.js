module.exports =
  ({ pool, queryReturnError }) =>
  async (req, res, next) => {
    const result = await pool.query(
      "SELECT name, phone, email, address FROM customers_details",
    );

    if (result.rowCount === 0) {
      return next(queryReturnError("No registered customers found.", 404));
    }

    res.status(200).json(result.rows);
  };
