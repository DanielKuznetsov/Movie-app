const Movie = require("../models/movieModel");

exports.getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ category: "Movie" });

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
    ``;
  }
};

// Will be done after user authentication/authorization is done
exports.getBookmarked = async (req, res, next) => {};
