const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/appError");
const { promisify } = require("util");

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

exports.login = catchAsync(async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please provide email and/or password!");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePasswords(password, user.password))) {
    // throw new Error("Incorrect email or password");
    // console.error("Incorrect email or password");
    return next(new AppError("Incorrect email or password"), 401);
  }

  createSendToken(user, 200, res);
});

exports.signup = catchAsync(async function (req, res, next) {
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist)
    return next(
      new AppError(
        "User with this email already exists. Please choose a different email!",
        404
      )
    );

  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting the token and check if it exists
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access"),
      401
    );
  }

  // 2) Verification the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user is still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError("The user beloging to the token is no longer exists!", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  res.locals.user = freshUser;
  req.user = freshUser;
  next();
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      token = req.cookies.jwt;

      // 2) Verification the token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      // console.log(decoded);

      // 3) Check if user is still exists
      const freshUser = await User.findById(decoded.id);
      if (!freshUser) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = freshUser; // this will allow that each PUG template will have access to this variable
      req.user = freshUser;

      return next();
    } catch (err) {
      return next();
    }
  }

  next();
};
