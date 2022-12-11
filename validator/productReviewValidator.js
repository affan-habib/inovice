const { body } = require("express-validator");

module.exports = [
  body("rating").not().isEmpty().withMessage("Product rating is required"),
  body("description").not().isEmpty().withMessage("Description is required"),
];
