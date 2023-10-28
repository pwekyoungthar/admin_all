const express = require("express");
const bankNameController = require("../controllers/bankNameControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
// Read All User Roles and Creat User Role
router
  .route("/")
  .get(userController.protect, bankNameController.getBankNameAll)
  .post(
    bankNameController.uploadBankNameImg,
    userController.protect,
    userController.restrictTo("Admin"),
    bankNameController.createBankName
  );
router
  .route("/:id")
  .patch(
    userController.protect,
    userController.restrictTo("Admin"),
    bankNameController.uploadBankNameImg,
    bankNameController.updateBankName
  );
module.exports = router;
