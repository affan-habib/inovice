const { body } = require("express-validator");

module.exports = [
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Must contain a number")
    .trim(),
  body("confirmPassword")
    .not()
    .isEmpty()
    .withMessage("Confirm password is required")
    .isLength({ min: 6 })
    .withMessage("Confirm password must be at least 6 characters long")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Confirm password doesn't match");
      }
      return true;
    }),
];
