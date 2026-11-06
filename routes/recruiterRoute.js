const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const isRecruiter = require("../middlewares/isRecruiter");
const { recruiterDashboard } = require("../controllers/recruiterController");

router.get(
  "/dashboard",
  isAuthenticated,
  isRecruiter,
  recruiterDashboard,
);

module.exports = router;