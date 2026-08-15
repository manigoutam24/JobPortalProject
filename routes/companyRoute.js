const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");

const {
  createCompany,
  getCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
  updateCompanyLogo,
} = require("../controllers/companyController");
const router = express.Router();

router.post("/create", isAuthenticated, createCompany);
router.get("/my", isAuthenticated, getCompany);
router.get("/:companyId", isAuthenticated, getCompanyById);
router.put("/:companyId", isAuthenticated, updateCompany);
router.delete("/:companyId", isAuthenticated, deleteCompany);

router.put(
  "/:companyId/logo",
  isAuthenticated,
  upload.single("logo"),
  updateCompanyLogo,
);

module.exports = router;
