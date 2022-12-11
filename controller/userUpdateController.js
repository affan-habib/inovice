const User = require("../model/authModel");

exports.UserUpdate = async (req, res, next) => {
  const { name, phone, gender, dateofbirth } = req.body;
  const { email } = req.params;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { name, phone, gender, dateofbirth } },
      { new: true, useFindAndModify: false }
    );
    if (user) {
      return res.json({
        id: user._id,
        name: user.name,
        username: user.username,
        Email: user.email,
        phone: user.phone,
        gender: user.gender,
        profile: user.profile,
        dateofbirth: user.dateofbirth,
        memberSince: user.memberSince,
        update: true
      });
    }else if(!user){
      return res.json({
        update: false
      })
    }
  } catch (error) {
    next();
  }
};

exports.UserImageUpload = async (req, res, next) => {
  const { profile } = req.body;
  const { email } = req.params;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { profile } },
      { new: true, useFindAndModify: false }
    );
    if (user) {
      return res.json({
        id: user._id,
        name: user.name,
        username: user.username,
        Email: user.email,
        phone: user.phone,
        gender: user.gender,
        profile: user.profile,
        dateofbirth: user.dateofbirth,
        memberSince: user.memberSince,
        update: true
      });
    }else if(!user){
      return res.json({
        update: false
      })
    }
  } catch (error) {
    next(error);
  }
};
