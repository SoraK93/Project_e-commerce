const handleChange = (func, field, value) => {
  func((prev) => ({ ...prev, [field]: value }));
};

export { handleChange }
