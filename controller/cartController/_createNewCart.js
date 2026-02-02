module.exports = () => (req, res, next) => {
  const customerId = req.params.customerId;
  res.status(201).json({ message: "Create successfuly" });
};
