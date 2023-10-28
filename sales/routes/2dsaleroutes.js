const express = require("express");
const Sale2DController = require("../controllers/2dsalecontrollers");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  //   .get(
  //     userController.protect,
  //     userController.restrictTo("Admin", "User"),
  //     Sale2DController.read2dAllNum
  //   )
  .post(
    userController.protect,
    userController.restrictTo("User"),
    Sale2DController.create2DsaleDoc
  );

module.exports = router;
