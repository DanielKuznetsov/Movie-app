const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const express = require("express");

const router = express.Router();

router.get("/", authController.protect, viewController.getHomepage);
router.get("/login", viewController.getLoginPage);
router.get("/signup", viewController.getSignupPage);

module.exports = router;
