const express = require("express");
const transferMainUnitController = require("../controllers/transferMainUnitController");
const userController = require("../../users/userControllers");

const router = express.Router();
// Create Main Unit
router
  .route("/")
  .get(
    userController.protect,
    userController.restrictTo("Admin"),
    transferMainUnitController.readMainUnitTransferHistory
  )
  .post(
    userController.protect,
    userController.restrictTo("Admin"),
    transferMainUnitController.transferMainUnitfun
  );

// router
//   .route("/")
//   .patch(
//     userController.protect,
//     userController.restrictTo("Admin"),
//     mainUnitController.updateMainUnit
//   );

module.exports = router;
