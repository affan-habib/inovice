const { authenticate } = require("../authenticate/authenticate");
const {
  Signup,
  Login,
  EmailVerify,
  ResendLink,
  changePassword,
  getSignInUser,
} = require("../controller/authcontroller");
const {
  ForgotPassword,
  ResetPassword,
} = require("../controller/forgotPasswordController");
const bindUserWithRequest = require("../middleware/bindUserWithRequest");
const forgotPasswordValidator = require("../validator/forgotPasswordValidator");
const loginValidator = require("../validator/loginValidator");
const resetPasswordValidator = require("../validator/resetPasswordValidator");
const signupValidator = require("../validator/signupValidator");
const router = require("express").Router();
router.post("/auth/signup", signupValidator, Signup);
router.post("/auth/login", loginValidator, Login);
router.put("/auth/email_verify/:token", EmailVerify);
router.post("/auth/resend_code/:email", ResendLink);
router.post(
  "/auth/forgot_password",
  bindUserWithRequest(),
  forgotPasswordValidator,
  ForgotPassword
);
router.post(
  "/auth/reset_password/:token",
  resetPasswordValidator,
  ResetPassword
);
router.put("/auth/change-password/:email", changePassword);
module.exports = router;
