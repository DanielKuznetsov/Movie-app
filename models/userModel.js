const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: String,
    firstName: String,
    lastName: String,
    role: String,
    email: String,
    password: String,
    photo: String,
    bookmarked: [String],
    liked: [String],
    active: Boolean,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
