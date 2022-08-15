const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const express = require("express");

const router = express.Router();

router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/signup", authController.signup);

router.use(authController.protect);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);

module.exports = router;
