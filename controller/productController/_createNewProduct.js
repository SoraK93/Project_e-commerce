module.exports =
  ({ pool, uuidv4 }) =>
  async (req, res, next) => {
    const { name, description, in_stock, price } = req.body;
    const id = uuidv4();
    const seller_id = uuidv4();

    const result = await pool.query(
      "INSERT INTO products VALUES ($1, $2, $3, $4, $5, $6)",
      [id, name, description, in_stock, price, seller_id],
    );
    res.status(201).json({ message: "create successful" });
  };
