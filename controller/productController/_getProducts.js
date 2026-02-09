module.exports =
  ({ pool }) =>
  async (req, res, next) => {
    const result = await pool.query(
      "SELECT \
      products.id, products.name AS product_name, products.description, \
      products.in_stock, products. price, seller.name AS seller_name \
      FROM products \
      INNER JOIN customers_details AS seller \
      ON seller.id = products.seller_id;",
    );
    
    res.status(200).json(result.rows);
  };
