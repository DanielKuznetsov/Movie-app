const Movie = require("../models/moviesModel");

exports.getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();

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
