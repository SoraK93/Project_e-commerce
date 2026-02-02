module.exports =
  ({ pool }) =>
  async (req, res, next) => {
    const result = await pool.query("SELECT * FROM products");
    res.send(result.rows);
  };
