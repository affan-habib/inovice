const { body } = require("express-validator");

module.exports = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required !")
    .isEmail()
    .withMessage("Please provide the valid email")
    .normalizeEmail()
    .escape()
    .trim(),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Must contain a number"),
];
