const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  createCompany,
  getCompany,
  getCompanyById,
  updateCompany,
  deleteCompany
} = require("../controllers/companyController");
const router = express.Router();

router.post("/create", isAuthenticated, createCompany);
router.get("/my", isAuthenticated, getCompany);
router.get("/:companyId", isAuthenticated, getCompanyById);
router.put("/:companyId", isAuthenticated, updateCompany);
router.delete("/:companyId",isAuthenticated, deleteCompany)

module.exports = router;
