const { validationResult } = require("express-validator");
const validationErrorMsg = require("../config/validationErrorMsg");
const jwt = require("jsonwebtoken");
const EmailSendToUser = require("../config/emailSenderSetup");
const forgotPasswordTemp = require("../util/Email-Template/forgotPasswordTemp");
const User = require("../model/authModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
exports.ForgotPassword = (req, res, next) => {
  const error = validationResult(req).formatWith(validationErrorMsg);
  if (!error.isEmpty()) {
    return res.json(error.mapped());
  }
  try {
    const token = jwt.sign(
      {
        _id: req.user._id,
        email: req.user.email,
        name: req.user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    EmailSendToUser(
      req.user.email,
      req.user.name,
      token,
      res,
      "Reset Password",
      forgotPasswordTemp
    );
    return res.json({
      message: "Reset password link has been sent your email",
    });
  } catch (error) {
    next(error);
  }
};

exports.ResetPassword = (req, res, next) => {
  const error = validationResult(req).formatWith(validationErrorMsg);
  if (!error.isEmpty()) {
    return res.json(error.mapped());
  }
  const { token } = req.params;
  const { password } = req.body;
  try {
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          return res.json({
            wrong: "Reset password link has been expired !",
          });
        }
        if (decodedToken) {
          const user = await User.findOne({ email: decodedToken.email });
          const hashedPassword = await bcrypt.hash(password, 10);
          user.password = hashedPassword;
          user.save();
          return res.json({
            success: "Password changed !"
          })
        }
      });
    }
  } catch (error) {
    next(error);
  }
};
