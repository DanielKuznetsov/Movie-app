const Movie = require("../models/movieModel");
const User = require("../models/userModel");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/appError");

exports.getAllMovies = catchAsync(async (req, res, next) => {
  let movies = await Movie.find({ category: "Movie" }).populate({
    path: "whoLiked whoBookmarked",
    select: "-__v",
  });

  if (!movies)
    return next(
      new AppError("No documents were found under 'Movie' category.", 404)
    );

  res.status(200).json({
    status: "success",
    results: movies.length,
    data: {
      data: movies,
    },
  });
});

exports.createMovie = catchAsync(async (req, res, next) => {
  const newMovie = await Movie.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      data: newMovie,
    },
  });
});

exports.getMovie = catchAsync(async (req, res, next) => {
  const movie = await Movie.find({ _id: req.params.id }).populate({
    path: "whoLiked whoBookmarked",
    select: "-__v",
  });

  if (!movie)
    return next(new AppError("Document with that ID was not found.", 404));

  res.status(200).json({
    status: "success",
    data: {
      data: movie,
    },
  });
});

exports.getAllTVSeries = catchAsync(async (req, res, next) => {
  const tvSeries = await Movie.find({
    // '$options: i' field is neccessary because we need to specify case insensiity
    category: { $regex: "tv s", $options: "i" },
  });

  if (!tvSeries) return next(new AppError("No TV Series were found.", 404));

  res.status(200).json({
    status: "success",
    results: tvSeries.length,
    data: {
      data: tvSeries,
    },
  });
});

exports.getTrending = catchAsync(async (req, res, next) => {
  const trendings = await Movie.find({ isTrending: true });

  if (!trendings)
    return next(new AppError("No trending movies were found.", 404));

  res.status(200).json({
    status: "success",
    results: trendings.length,
    data: {
      data: trendings,
    },
  });
});

exports.likeMovie = catchAsync(async function (req, res, next) {
  const isInArray = req.user.liked.some((movie) => {
    return movie.equals(req.params.id);
  });

  if (!isInArray) {
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
      // 'addToSet' means it won't add any more than ust 1 item with same ID
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
    req.user.liked.some((movie) => {
      if (movie.equals(req.params.id)) return;
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
});

exports.bookmarkMovie = catchAsync(async function (req, res, next) {
  const isInArray = req.user.bookmarked.some((movie) => {
    return movie.equals(req.params.id);
  });

  if (!isInArray) {
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
  }

  if (isInArray) {
    req.user.liked.some((movie, i) => {
      if (movie.equals(req.params.id)) return (index = i);
    });

    await User.findOneAndUpdate(
      { _id: req.user.id },
      { $pull: { bookmarked: req.params.id } }
    );

    await Movie.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $pull: { whoBookmarked: req.user.id } }
    );

    res.status(200).json({
      status: "success",
    });
  }
});

exports.getBookmarked = function (req, res, next) {
  const bookmarkedMovies = req.user.bookmarked;

  if (bookmarkedMovies.length === 0)
    return next(new AppError("You did not bookmark any movies yet.", 404));

  res.status(200).json({
    status: "success",
    data: {
      data: bookmarkedMovies,
    },
  });
};

exports.getLiked = (req, res, next) => {
  const likedMovies = req.user.liked;

  if (likedMovies.length === 0)
    return next(new AppError("You did not like any movies yet.", 404));

  res.status(200).json({
    status: "success",
    data: {
      data: likedMovies,
    },
  });
};
