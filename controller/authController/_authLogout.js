module.exports = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    res.clearCookie("connect.sid");

    req.session.destroy(() => {
      res.status(200).json({ message: "Logout successful" });
    });
  });
};
