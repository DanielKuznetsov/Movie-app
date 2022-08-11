const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const express = require("express");

const router = express.Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);

router.get("/", userController.getAllUsers);

module.exports = router;
