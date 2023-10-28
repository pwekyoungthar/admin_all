const express = require("express");
const mainUnitController = require("../controllers/mainUnitController");
const userController = require("../../users/userControllers");

const router = express.Router();
// Create Main Unit
router
  .route("/")
  .get(
    userController.protect,
    userController.restrictTo("Admin"),
    mainUnitController.getMainUnitValue
  )
  .post(
    userController.protect,
    userController.restrictTo("Admin"),
    mainUnitController.createMainUnit
  );

router
  .route("/")
  .patch(
    userController.protect,
    userController.restrictTo("Admin"),
    mainUnitController.updateMainUnit
  );

module.exports = router;
