module.exports = (req, res) => {
  res.status(200).json({ message: "Login Successful", user: req.user });
};
