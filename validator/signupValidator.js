const { body } = require("express-validator");
const User = require("../model/authModel");
module.exports = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 characters long")
    .trim(),
  body("username")
    .not()
    .isEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .custom(async (username) => {
      const usernameMatch = await User.findOne({ username });
      if (usernameMatch) {
        return Promise.reject("Username already exists");
      }
      return true;
    })
    .matches(/\d/)
    .withMessage("Must contain a number")
    .trim(),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .custom(async (email) => {
      const emailMatch = await User.findOne({ email });
      if (emailMatch) {
        return Promise.reject("Email already in used !");
      }
    })
    .normalizeEmail()
    .isEmail()
    .withMessage("Please provide a valid email")
    .trim(),
  body("phone")
    .not()
    .isEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 11, max: 11 })
    .withMessage("Invalid phone number")
    .custom(async (phone) => {
      const numberMatch = await User.findOne({ phone });
      if (numberMatch) {
        return Promise.reject("Phone number already in used !");
      }
    })
    .trim(),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Must contain a number")
    .trim(),
  body("passwordConfirm")
    .not()
    .isEmpty()
    .withMessage("Confirm password is required")
    .isLength({ min: 6 })
    .withMessage("Confirm password must be at least 6 characters long")
    .custom((passwordConfirm, { req }) => {
      if (passwordConfirm !== req.body.password) {
        throw new Error("Confirm password doesn't match");
      }
      return true;
    }),
];
