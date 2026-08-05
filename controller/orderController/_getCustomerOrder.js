const pool = require("../../model/database");

module.exports = async (req, res) => {
  const customerId = req.user.id;

  const query = `SELECT order_details.id, products.name, 
    (quantity * products.price) AS amount,
    quantity, payment_status, payment_mode 
    FROM order_details 
    INNER JOIN products ON products.id = order_details.product_id 
    WHERE order_details.customer_id = $1`;
  const result = await pool.query(query, [customerId]);

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "No order found." });
  }

  res.json(result.rows);
};
