const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide your first name!"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide your last name!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email!"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email!"],
    },
    password: {
      type: String,
      required: [true, "Please provide your password!"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please provide your password!"],
      validate: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match!",
    },
    photo: {
      type: String,
      default: "default.jpeg",
    },
    bookmarked: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Movie",
      },
    ],
    liked: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Movie",
      },
    ],
    active: Boolean,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (req, res, next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.comparePasswords = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
