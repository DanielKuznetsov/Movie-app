const Movie = require("../models/movieModel");

exports.getHomepage = async function (req, res, next) {
  const trendings = await Movie.find({ isTrending: true });

  res.status(200).render("base", {
    title: "Home Page",
    trendings,
    user: req.user,
  });
};

exports.getLoginPage = function (req, res, next) {
  res.status(200).render("login", {
    title: "Login Page",
  });
};

exports.getSignupPage = function (req, res, next) {
  res.status(200).render("signup", {
    title: "Sign Up Page",
  });
};

exports.getMoviesPage = function (req, res, next) {
  res.status(200).render("movies", {
    title: "All Movies Page",
  });
};

exports.getTVPage = function (req, res, next) {
  res.status(200).render("tv", {
    title: "TV Series Page",
  });
};

exports.getBookmarkedPage = function (req, res, next) {
  res.status(200).render("bookmarked", {
    title: "Bookmarked Page",
  });
};
