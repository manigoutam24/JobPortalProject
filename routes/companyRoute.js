const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  createCompany,
  getCompany,
} = require("../controllers/companyController");
const router = express.Router();

router.post("/create", isAuthenticated, createCompany);
router.get("/my", isAuthenticated, getCompany);

module.exports = router;
