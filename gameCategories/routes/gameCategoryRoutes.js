const express = require("express");
const gameCategoryController = require("../controllers/gameCategoryControllers");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .get(
    userController.protect,
    userController.restrictTo("Admin", "User"),
    gameCategoryController.getGameCatAll
  )
  .post(
    userController.protect,
    userController.restrictTo("Admin"),
    gameCategoryController.createGameCat
  )
  .patch(
    userController.protect,
    userController.restrictTo("Admin"),
    gameCategoryController.updateGameCatStatus
  );

module.exports = router;
