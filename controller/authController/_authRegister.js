module.exports =
  ({ pool, uuidv4, bcrypt }) =>
  async (req, res, next) => {
    const user = {
      id: uuidv4(),
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    };

    const values = [
      user.id,
      user.name,
      user.phone,
      user.email,
      user.password,
      user.address,
      user.isSeller
    ];

    const result = await pool.query(
      "INSERT INTO customers_details VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      values,
    );

    req.login(user, (err) => {
      if (err) return next(err);
      
      res
        .status(201)
        .json({ message: "Registered and Logged in", user: result.rows[0] });
    });
  };
