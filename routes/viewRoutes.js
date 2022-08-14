const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

// router.get("/", authController.isLoggedIn, viewController.getHomepage);
// router.get("/signup", viewController.getSignupPage);
// router.get("/home", authController.isLoggedIn, viewController.getHomepage);

module.exports = router;
