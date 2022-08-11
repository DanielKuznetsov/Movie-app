const User = require("../models/userModel");

exports.getAllUsers = async function (req, res, next) {
  const users = await User.find().populate({
    path: "liked",
  });

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      data: users,
    },
  });
};
