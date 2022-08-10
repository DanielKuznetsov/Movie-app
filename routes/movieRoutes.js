const express = require("express");
const movieController = require("../controllers/movieController");

const router = express.Router();

router.route("/").get(movieController.getAllMovies);
router.route("/tvSeries").get(movieController.getAllTVSeries);
router.get("/trending", movieController.getTrending);
router.get("/bookmarked", movieController.getBookmarked);

module.exports = router;
