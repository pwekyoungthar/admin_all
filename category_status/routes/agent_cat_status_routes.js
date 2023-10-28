const express = require("express");
const agentSubCatStatusController = require("../controllers/agent_cat_status_controller");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .get(
    userController.protect,
    userController.restrictTo("Admin", "Master"),
    agentSubCatStatusController.getGameCatStatusAll
  );

module.exports = router;
