const queryReturnError = require("./api-errors");

// used to generated product and customer patch route query related information
function genPatchRouteQueryList(data, next) {
  const updateFields = [];
  const updateValues = [];

  let index = 0;

  for (let key in data) {
    if (key === "id" || key === "seller_id") {
      return next(
        queryReturnError(`Invalid request: ${key} cannot be updated.`, 400),
      );
    }
    index++;
    updateFields.push(`${key} = $${index}`);
    updateValues.push(data[key]);
  }

  return [updateFields, updateValues];
}

module.exports = { genPatchRouteQueryList };
