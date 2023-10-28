const express = require("express");
const gameSubCatController = require("../controllers/gameSubCatControllers");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .get(
    userController.protect,
    userController.restrictTo("Admin", "User"),
    gameSubCatController.getSubGameCatAll
  )
  .post(
    userController.protect,
    userController.restrictTo("Admin"),
    gameSubCatController.createSubGameCat
  )
  .patch(
    userController.protect,
    userController.restrictTo("Admin"),
    gameSubCatController.updateSubGameCat
  );

module.exports = router;
