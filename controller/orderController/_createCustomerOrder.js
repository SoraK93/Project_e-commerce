module.exports =
  ({ pool, createOrderQuery, uuidv4 }) =>
  async (req, res, next) => {
    const c_Id = req.params.customerId;
    const {
      product_id: p_id,
      quantity,
      payment_status: pay_status,
      payment_mode: pay_mode,
    } = req.body;

    const id = uuidv4();
    const ordered_on = new Date().toLocaleString();

    const orderQuery = createOrderQuery("post");
    const value = [id, p_id, c_Id, quantity, pay_status, pay_mode, ordered_on];

    const result = await pool.query(orderQuery, value);

    res.status(201).json({ message: "Create successfuly" });
  };
