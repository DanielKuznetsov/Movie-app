const User = require("../models/userModel");

exports.getAllUsers = async function (req, res, next) {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      data: users,
    },
  });
};

exports.getUser = async function (req, res, next) {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
};
