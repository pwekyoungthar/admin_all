const express = require("express");
const agentSubCatStatusController = require("../controllers/agent_subcat_statuus_controller");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .get(
    userController.protect,
    userController.restrictTo("Admin", "Master"),
    agentSubCatStatusController.getGameSubCatStatusAll
  );

module.exports = router;
