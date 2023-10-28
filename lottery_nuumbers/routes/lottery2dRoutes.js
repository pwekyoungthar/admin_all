const express = require("express");
const lottery2dController = require("../controllers/thai2DLotteryMorning12Controllers");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .get(
    userController.protect,
    userController.restrictTo("Admin"),
    lottery2dController.read2dAllNum
  )
  .patch(
    userController.protect,
    userController.restrictTo("Admin"),
    lottery2dController.update2DNum
  );

module.exports = router;
