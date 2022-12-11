const { Schema, model } = require("mongoose");

const forgotPassword = new Schema({
  email: {
    type: String,
    required: true,
  },
});

const ForgotPassword = model("forgotpassword", forgotPassword);
module.exports = ForgotPassword;
