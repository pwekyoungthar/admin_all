const express = require("express");
const masterSubCatStatusController = require("../controllers/master_subcat_status_controller");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .get(
    userController.protect,
    userController.restrictTo("Admin"),
    masterSubCatStatusController.getGameSubCatStatusAll
  )

  .patch(
    userController.protect,
    userController.restrictTo("Admin"),
    masterSubCatStatusController.updateGameSubCatStatus
  );

module.exports = router;
