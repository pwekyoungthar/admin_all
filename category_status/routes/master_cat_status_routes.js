const express = require("express");
const masterCatStatusController = require("../controllers/master_cat_status_controller");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .get(
    userController.protect,
    userController.restrictTo("Admin"),
    masterCatStatusController.getGameCatStatusAll
  )
  //   .post(
  //     userController.protect,
  //     userController.restrictTo("Admin"),
  //     gameCategoryController.createGameCat
  //   )
  .patch(
    userController.protect,
    userController.restrictTo("Admin"),
    masterCatStatusController.updateGameCatStatus
  );

module.exports = router;
