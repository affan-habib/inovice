const { body, check } = require("express-validator");
module.exports = [
  body("product").not().isEmpty().withMessage("Product is required"),
  body("payment").not().isEmpty().withMessage("Payment name is required"),
  check("payment.accountNumber")
    .not()
    .isEmpty()
    .withMessage("Account number is required")
    .escape()
    .trim(),
  check("payment.trxId")
    .not()
    .isEmpty()
    .withMessage("TRX id is required")
    .escape()
    .trim(),
];
