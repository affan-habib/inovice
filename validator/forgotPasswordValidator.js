const { body } = require("express-validator");
const User = require("../model/authModel");

module.exports = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required !")
    .custom(async (email) => {
      const emailMatch = await User.findOne({ email });
      if (!emailMatch) {
        return Promise.reject("Email doesn't match database records");
      }
      return true;
    })
    .isEmail()
    .withMessage("Please provide the valid email")
    .normalizeEmail()
    .escape()
    .trim(),
];
