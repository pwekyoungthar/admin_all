const express = require("express");
const lotteryFilterSettingController = require("../controllers/lotteryFilterSettingControllers");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .post(
    userController.protect,
    userController.restrictTo("Admin"),
    lotteryFilterSettingController.createLotterySetting
  )
  .get(
    userController.protect,
    lotteryFilterSettingController.getAllLotterySetting
  )
  .patch(
    userController.protect,
    lotteryFilterSettingController.updateLotterySettingById
  );

// router
//   .route("/:id")
//   .patch(
//     userController.protect,
//     userController.restrictTo("Admin"),
//     lotterySettingController.updateLotterySettingById
//   );

module.exports = router;
