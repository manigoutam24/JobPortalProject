const express = require("express");
const {
  registerController,
  loginController,
  updateProfile,
  updateProfilePhoto,
  logoutController,
  changePassword,
  getProfile,
  studentDashboard,
} = require("../controllers/userController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");
const uploadProfilePhoto = require("../middlewares/uploadprofilePhoto");
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/profile", isAuthenticated, getProfile);

router.put(
  "/profile/update",
  isAuthenticated,
  upload.single("resume"),
  updateProfile,
);

router.put(
  "/profile/photo",
  isAuthenticated,
  uploadProfilePhoto.single("profilePhoto"),
  updateProfilePhoto,
);

router.post("/logout", isAuthenticated, logoutController);

router.put("/change-password", isAuthenticated, changePassword);

router.get("/dashboard", isAuthenticated, studentDashboard);

module.exports = router;
