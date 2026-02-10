module.exports =
  ({ pool, uuidv4, bcrypt }) =>
  async (req, res, next) => {
    const details = {
      id: uuidv4(),
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    };

    const values = [
      details.id,
      details.name,
      details.phone,
      details.email,
      details.password,
      details.address,
    ];

    const result = await pool.query(
      "INSERT INTO customers_details VALUES ($1, $2, $3, $4, $5, $6)",
      values,
    );
    
    res.status(201).json({ message: "Create successfuly" });
  };
