const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: String,
    thumbnail: {
      trending: {
        small: String,
        large: String,
      },
      regular: {
        small: String,
        medium: String,
        large: String,
      },
    },
    year: Number,
    category: String,
    rating: String,
    isBookmared: Boolean,
    whoBookmarked: [String],
    isTrending: Boolean,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
