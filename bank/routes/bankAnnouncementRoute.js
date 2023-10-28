const express = require("express");
const bankAnnouncementController = require("../controllers/bankAnnouncementController");
const userController = require("../../users/userControllers");

const router = express.Router();
// Read All User Roles and Creat User Role
router
  .route("/")
  .get(
    userController.protect,
    userController.restrictTo("Admin", "User"),
    bankAnnouncementController.getBankAnnounc
  )
  .post(
    userController.protect,
    userController.restrictTo("Admin"),
    bankAnnouncementController.createBankAnnounc
  )
  .patch(
    userController.protect,
    userController.restrictTo("Admin"),
    bankAnnouncementController.updateBankAnnounc
  );

module.exports = router;
