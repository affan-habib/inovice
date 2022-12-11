const User = require("../model/authModel");

module.exports = () => {
  return async (req, res, next) => {
    try {
      const user = await User.findOne({email: req.body.email});
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
};
