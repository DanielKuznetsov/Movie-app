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

exports.getMoviesPage = async function (req, res, next) {
  const movies = await Movie.find({ category: "Movie" }).populate({
    path: "whoLiked whoBookmarked",
    select: "-__v",
  });

  res.status(200).render("movies", {
    title: "All Movies Page",
    movies,
  });
};

exports.getTVPage = async function (req, res, next) {
  const allTVSeries = await Movie.find({
    // '$options: i' field is neccessary because we need to specify case insensiity
    category: { $regex: "tv s", $options: "i" },
  });

  res.status(200).render("tv", {
    title: "TV Series Page",
    allTVSeries,
  });
};

exports.getBookmarkedPage = function (req, res, next) {
  const tvs = req.user.bookmarked.filter((el) => el.category === "TV Series");
  const movies = req.user.bookmarked.filter((el) => el.category === "Movie");

  res.status(200).render("bookmarked", {
    title: "Bookmarked Page",
    tvs,
    movies,
  });
};
