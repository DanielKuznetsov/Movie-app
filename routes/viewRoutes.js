const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const express = require("express");

const router = express.Router();

router.get("/", authController.protect, viewController.getHomepage);
router.get("/login", viewController.getLoginPage);
router.get("/signup", viewController.getSignupPage);
// router.get("/movies", authController.protect, viewController.getMoviesPage);
// router.get("/tv", authController.protect, viewController.getTVPage);
// router.get("/bookmarked", authController.protect, viewController.getBookmarkedPage);

module.exports = router;
