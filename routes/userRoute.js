const express = require("express");
const {
  registerController,
  loginController,
  profile,
  updateProfile,
} = require("../controllers/userController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");
const router = express.Router();

router.get("/profile", isAuthenticated, profile);
router.post("/register", registerController);
router.post("/login", loginController);
router.put(
  "/profile/update",
  isAuthenticated,
  upload.single("resume"),
  updateProfile,
);

module.exports = router;
