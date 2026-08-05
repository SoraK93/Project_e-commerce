module.exports =
  ({ pool }) =>
  async (req, res, next) => {
    // body.seller_id = products sold by seller (POST)
    // user.id = products listed by themselves (GET)
    const sellerId = req.body?.seller_id || req.user.id;

    const result = await pool.query(
      "SELECT \
      products.id, products.name AS product_name, products.description, \
      products.in_stock, products. price, seller.name AS seller_name \
      FROM products INNER JOIN customers_details AS seller\
      ON seller.id = products.seller_id WHERE products.seller_id = $1",
      [sellerId],
    );

    if (!result.rowCount)
      return res.sendStatus(204);

    res.status(200).json(result.rows);
  };
