const { body } = require("express-validator");
const fields = [
  "name",
  "category",
  "unit",
  "weight",
  "productImage",
  "price",
  "stock",
  "sku",
];
module.exports = [
  fields.map((item) =>
    body(item)
      .not()
      .isEmpty()
      .withMessage(`${item[0].toUpperCase() + item.substring(1)} is required`)
  ),
];
