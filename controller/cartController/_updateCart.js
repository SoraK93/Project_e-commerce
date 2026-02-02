module.exports = () => (req, res, next) => {
  const customerId = req.params.customerId;
  res.status(204).send();
};
