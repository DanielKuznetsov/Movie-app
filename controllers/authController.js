const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 // converting to milliseconds
    ),
    // secure: true, // to ensure that the cookie will be sent on an excrypted connection
    httpOnly: true, // to ensure the cookie won't be modified or access by the browser
  };

  // Stroring token in http cookie
  cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.login = async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please provide email and/or password!");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePasswords(password, user.password))) {
    throw new Error("Incorrect email or password");
  }

  createSendToken(user, 200, res);
};

exports.signup = async function (req, res, next) {
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) return next();

  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
};
