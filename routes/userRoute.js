const express = require("express");
const {
  registerController,
  loginController,
  test,
  updateProfile,
} = require("../controllers/userController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();

router.get("/profile", isAuthenticated, test);
router.post("/register", registerController);
router.post("/login", loginController);
router.put("/profile/update", isAuthenticated, updateProfile);

module.exports = router;
