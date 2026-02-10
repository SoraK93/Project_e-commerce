module.exports =
  ({ pool, queryReturnError, bcrypt }) =>
  async (req, res, next) => {
    const details = { ...req.body };

    const passwordHash = await pool.query(
      "SELECT password FROM customers_details WHERE email = $1",
      [details.email],
    );
    if (passwordHash.rowCount === 0) {
      return next(
        queryReturnError("Incorrect Email or Password provided"),
        404,
      );
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      passwordHash.rows[0].password,
    );
    if (!isValidPassword) {
      return next(
        queryReturnError("Incorrect Email or Password provided"),
        400,
      );
    }

    res.status(200).json({ message: "Login successful" });
  };
