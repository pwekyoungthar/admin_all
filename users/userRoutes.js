const express = require("express");
const userController = require("./userControllers");

const router = express.Router();
//User Register
router.route("/signup").post(userController.signup);

//User Login
router.post("/login", userController.login);

// Forget Password
router.post(
  "/forgotPassword",
  userController.protect,
  userController.forgetPassword
);
router.patch(
  "/resetPassword/:token",
  userController.protect,
  userController.resetPassword
);
router.patch(
  "/updateMyPassword",
  userController.protect,
  userController.updatePassword
);

// All Get User
router
  .route("/")
  .get(
    userController.protect,
    userController.restrictTo("Admin"),
    userController.getUsersAll
  );
// Profile
router
  .route("/User/profile")
  .get(userController.protect, userController.getProfile);
//Filter User Roles
router
  .route("/:role")
  .get(
    userController.protect,
    userController.restrictTo("Admin"),
    userController.getUsersAll
  );

// router
//   .route("/user/master")
//   .patch(
//     userController.protect,
//     userController.restrictTo("Admin"),
//     userController.updateMasterStatus
//   );

module.exports = router;
