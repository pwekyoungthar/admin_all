const express = require("express");
const userController = require("./userControllers");

const router = express.Router();
// Profile
router.route("/").get(userController.protect, userController.getProfile);
router.route("/").patch(userController.protect, userController.updateProfile);

module.exports = router;
