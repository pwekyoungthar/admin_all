const express = require("express");
const bankTypeController = require("../controllers/bankTypeControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
// Read All User Roles and Creat User Role
router
  .route("/")
  .get(userController.protect, bankTypeController.getBankTypeAll)
  .post(
    userController.protect,
    userController.restrictTo("Admin"),
    bankTypeController.createBankType
  )
  .patch(
    userController.protect,
    userController.restrictTo("Admin"),
    bankTypeController.updateBankType
  );

module.exports = router;
