const Movie = require("../models/movieModel");

exports.getHomepage = async function (req, res, next) {
  const trendings = await Movie.find({ isTrending: true });

  const bookmarkIDs = [];
  req.user.bookmarked.forEach((el) => bookmarkIDs.push(el._id.valueOf()));

  const likedIDs = [];
  req.user.liked.forEach((el) => likedIDs.push(el._id.valueOf()));

  let movies;
  const query = req.query.search;

  if (req.query.search?.trim().length === 0) {
    movies = null;
  } else {
    movies = await Movie.find({
      title: { $regex: String(req.query.search), $options: "i" },
    }).populate({
      path: "whoLiked whoBookmarked",
      select: "-__v",
    });
  }

  console.log(movies);
  console.log(req.query);

  if (String(Object.keys(req.query)) === "search") {
    res.status(200).render("_genSearch", {
      title: "General Page",
      movies,
      query,
      bookmarkIDs,
      likedIDs,
    });
  } else {
    res.status(200).render("base", {
      title: "Home Page",
      trendings,
      user: req.user,
      bookmarkIDs,
      likedIDs,
    });
  }
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

  const bookmarkIDs = [];
  req.user.bookmarked.forEach((el) => bookmarkIDs.push(el._id.valueOf()));

  const likedIDs = [];
  req.user.liked.forEach((el) => likedIDs.push(el._id.valueOf()));

  res.status(200).render("movies", {
    title: "All Movies Page",
    movies,
    bookmarkIDs,
    likedIDs,
  });
};

exports.getTVPage = async function (req, res, next) {
  const allTVSeries = await Movie.find({
    // '$options: i' field is neccessary because we need to specify case insensiity
    category: { $regex: "tv s", $options: "i" },
  });

  const bookmarkIDs = [];
  req.user.bookmarked.forEach((el) => bookmarkIDs.push(el._id.valueOf()));

  const likedIDs = [];
  req.user.liked.forEach((el) => likedIDs.push(el._id.valueOf()));

  res.status(200).render("tv", {
    title: "TV Series Page",
    allTVSeries,
    bookmarkIDs,
    likedIDs,
  });
};

exports.getBookmarkedPage = function (req, res, next) {
  const tvs = req.user.bookmarked.filter((el) => el.category === "TV Series");
  const movies = req.user.bookmarked.filter((el) => el.category === "Movie");

  const bookmarkIDs = [];
  req.user.bookmarked.forEach((el) => bookmarkIDs.push(el._id.valueOf()));

  const likedIDs = [];
  req.user.liked.forEach((el) => likedIDs.push(el._id.valueOf()));

  res.status(200).render("bookmarked", {
    title: "Bookmarked Page",
    tvs,
    movies,
    bookmarkIDs,
    likedIDs,
  });
};

exports.bookmarkMovie = async function (req, res, next) {};
