const express = require("express");
const movieController = require("../controllers/movieController");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.protect);

router.route("/").get(movieController.getAllMovies);
router.route("/bookmarked").get(movieController.getBookmarked);
router.route("/likedMovies").get(movieController.getLiked);
router.route("/tvSeries").get(movieController.getAllTVSeries);
router.get("/trending", movieController.getTrending);

router.route("/").post(movieController.createMovie);
router.route("/:id").get(movieController.getMovie);

router.route("/like/:id").post(movieController.likeMovie);

router.route("/bookmark/:id").post(movieController.bookmarkMovie);

module.exports = router;
