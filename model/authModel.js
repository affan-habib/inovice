const { Schema, model } = require("mongoose");
const signupModel = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  username: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minLength: 11,
    maxLength: 11,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  profile: {
    type: String,
  },
  gender: {
    type: String,
  },
  dateofbirth: {
    type: String,
  },
  memberSince: {
    type: String,
    default: new Date().toString().split(" ").splice(1, 3).join(" "),
  },
  verify: {
    type: Boolean,
  },
  active: {
    type: Boolean,
  },
});
const User = model("user", signupModel);
module.exports = User;
