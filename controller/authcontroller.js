const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const validationErrorMsg = require("../config/validationErrorMsg");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/authModel");
const EmailSendToUser = require("../config/emailSenderSetup");
const userVerifyTemp = require("../util/Email-Template/userVerifyTemp");
// user sign up
exports.Signup = async (req, res, next) => {
  const error = validationResult(req).formatWith(validationErrorMsg);
  if (!error.isEmpty()) {
    return res.json(error.mapped());
  }
  try {
    const {
      name,
      username,
      email,
      phone,
      password,
      profile,
      gender,
      dateofbirth,
      memberSince,
    } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);
    const user = await new User({
      name,
      username,
      email,
      phone,
      password: hashedPassword,
      profile,
      gender,
      dateofbirth,
      memberSince,
      verify: false,
      active: true,
    });
    const createdUser = await user.save();
    let token = jwt.sign(
      {
        _id: createdUser._id,
        email: createdUser.email,
        name: createdUser.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    if (createdUser) {
      EmailSendToUser(
        req.body.email,
        req.body.name,
        token,
        res,
        "Verify your email",
        userVerifyTemp
      );
    }
  } catch (error) {
    next(error);
  }
};
// user email verification
exports.EmailVerify = async (req, res, next) => {
  const { token } = req.params;
  try {
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (error, decodedToken) => {
        if (error) {
          return res.json({
            wrong: "Your activation link has been expired !",
          });
        }
        if (decodedToken) {
          const { email } = decodedToken;
          const user = await User.findOne({ email });
          user.verify = true;
          await user.save();
          if (user) {
            return res.json({
              success: "Your account activation successfully !",
            });
          }
          if (!user) {
            return res.json({
              credention: "User create failed !",
            });
          }
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// resend activation link send again user email
exports.ResendLink = async (req, res, next) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    let signToken = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    EmailSendToUser(
      user.email,
      user.name,
      signToken,
      res,
      "Resent Link",
      userVerifyTemp
    );
    return res.json({
      success: "Activation link resent",
    });
  } catch (error) {
    next(error);
  }
};

// user login controller
exports.Login = async (req, res, next) => {
  const { email, password } = req.body;
  const error = validationResult(req).formatWith(validationErrorMsg);
  if (!error.isEmpty()) {
    return res.send(error.mapped());
  }
  try {
    let loginUser = await User.findOne({ email });

    if (!loginUser) {
      return res.json({
        wrong: "Wrong email and password !",
      });
    }
    const matchPassword = await bcrypt.compare(password, loginUser.password);
    if (!matchPassword) {
      return res.json({
        wrong: "Wrong email and password !",
      });
    }
    if (!loginUser.verify) {
      return res.json({
        wrong: "You must verify your email",
      });
    }
    if (!loginUser.active) {
      return res.json({
        wrong: "Now, you are inactivated",
      });
    }
    if (loginUser && matchPassword) {
      let token = jwt.sign(
        {
          _id: loginUser._id,
          username: loginUser.username,
          name: loginUser.name,
          email: loginUser.email,
          phone: loginUser.phone,
          profile: loginUser.profile,
          gender: loginUser.gender,
          dateofbirth: loginUser.dateofbirth,
          memberSince: loginUser.memberSince,
        },
        "SECRET",
        { expiresIn: "7d" }
      );
      return res.json({
        id: loginUser._id,
        name: loginUser.name,
        username: loginUser.username,
        Email: loginUser.email,
        phone: loginUser.phone,
        gender: loginUser.gender,
        profile: loginUser.profile,
        dateofbirth: loginUser.dateofbirth,
        memberSince: loginUser.memberSince,
        credential: "User successfully login !",
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};
// change password
exports.changePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.json({
        wrong: "Email doesn't match on the database!",
      });
    }
    const matchPassword = await bcrypt.compare(
      req.body.oldpassword,
      user.password
    );
    if (matchPassword) {
      let hashedPassword = await bcrypt.hash(req.body.newpassword, 10);
      user.password = hashedPassword;
      await user.save();
      return res.json({
        message: "Password changed!",
      });
    }
    if (!matchPassword) {
      return res.json({
        wrong: "Password doesn't match on the database!",
      });
    }
  } catch (error) {
    next(error);
  }
};
