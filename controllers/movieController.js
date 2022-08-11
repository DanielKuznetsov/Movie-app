const Movie = require("../models/movieModel");
const User = require("../models/userModel");

exports.getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ category: "Movie" }).populate({
      path: "whoLiked whoBookmarked",
      select: "-__v",
    });

    res.status(200).json({
      status: "success",
      results: movies.length,
      data: {
        data: movies,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports.createMovie = async (req, res, next) => {
  try {
    const newMovie = await Movie.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        data: newMovie,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getMovie = async (req, res, next) => {
  const movie = await Movie.find({ _id: req.params.id }).populate({
    path: "whoLiked whoBookmarked",
    select: "-__v",
  });

  res.status(200).json({
    status: "success",
    data: {
      data: movie,
    },
  });
};

exports.getAllTVSeries = async (req, res, next) => {
  try {
    const tvSeries = await Movie.find({
      // '$options: i' field is neccessary because we need to specify case insensiity
      category: { $regex: "tv s", $options: "i" },
    });

    res.status(200).json({
      status: "success",
      results: tvSeries.length,
      data: {
        data: tvSeries,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getTrending = async (req, res, next) => {
  try {
    const trendings = await Movie.find({ isTrending: true });

    res.status(200).json({
      status: "success",
      results: trendings.length,
      data: {
        data: trendings,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports.likeMovie = async function (req, res, next) {
  const isInArray = req.user.liked.some((movie) => {
    return movie.equals(req.params.id);
  });

  if (!isInArray) {
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
      $addToSet: { whoLiked: req.user.id },
    });

    const user = await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { liked: req.params.id },
    });

    res.status(200).json({
      status: "success!",
      data: {
        data: movie,
      },
    });
  }

  if (isInArray) {
    req.user.liked.some((movie, i) => {
      if (movie.equals(req.params.id)) return (index = i);
    });

    await User.findOneAndUpdate(
      { _id: req.user.id },
      { $pull: { liked: req.params.id } }
    );

    await Movie.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $pull: { whoLiked: req.user.id } }
    );

    res.status(200).json({
      status: "success",
    });
  }
};

exports.bookmarkMovie = async function (req, res, next) {
  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    $addToSet: { whoBookmarked: req.user.id },
  });

  const user = await User.findByIdAndUpdate(req.user.id, {
    $addToSet: { bookmarked: req.params.id },
  });

  res.status(200).json({
    status: "success",
    data: {
      data: movie,
    },
  });
};

exports.getBookmarked = function (req, res, next) {
  const bookmarkedMovies = req.user.bookmarked;

  res.status(200).json({
    status: "success",
    data: {
      data: bookmarkedMovies,
    },
  });
};

exports.getLiked = (req, res, next) => {
  const likedMovies = req.user.liked;

  res.status(200).json({
    status: "success",
    data: {
      data: likedMovies,
    },
  });
};
