const express = require("express");
const mainUnitHistoryController = require("../controllers/mainUnitHistoryController");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .get(
    userController.protect,
    userController.restrictTo("Admin"),
    mainUnitHistoryController.readMainUnitHistoryAll
  );

module.exports = router;
