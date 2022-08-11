const express = require("express");
const movieController = require("../controllers/movieController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(movieController.getAllMovies);
router.route("/tvSeries").get(movieController.getAllTVSeries);
router.get("/trending", movieController.getTrending);

router.route("/").post(movieController.createMovie);
router.route("/:id").get(movieController.getMovie);

router
  .route("/like/:id")
  .post(authController.protect, movieController.likeMovie);

// router.get("/bookmarked", movieController.getBookmarked);
// router.get("/likedMovies", movieController.getLikedMovies);

module.exports = router;
