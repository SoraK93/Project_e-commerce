module.exports =
  ({ pool, queryReturnError }) =>
  async (req, res, next) => {
    if (!req.user.id) {
      return next(queryReturnError("No registered customers found.", 404));
    }

    res.status(200).json(req.user);
  };
