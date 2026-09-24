const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");
const {
  getAllUser,
  getUserById,
  deleteUser,
  getAllCompanies,
  deleteCompany,
  getAllJobs,
  deleteJob,
  getAllApplications,
  getApplicationById,
  deleteApplication,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/users", isAuthenticated, isAdmin, getAllUser);

router.get("/users/:userId", isAuthenticated, isAdmin, getUserById);

router.delete("/users/:userId", isAuthenticated, isAdmin, deleteUser);

router.get("/companies", isAuthenticated, isAdmin, getAllCompanies);

router.delete("/companies/:companyId", isAuthenticated, isAdmin, deleteCompany);

router.get("/jobs", isAuthenticated, isAdmin, getAllJobs);

router.delete("/jobs/:jobId", isAuthenticated, isAdmin, deleteJob);

router.get("/applications", isAuthenticated, isAdmin, getAllApplications);

router.get(
  "/applications/:applicationId",
  isAuthenticated,
  isAdmin,
  getApplicationById,
);

router.delete(
  "/applications/:applicationId",
  isAuthenticated,
  isAdmin,
  deleteApplication,
);

module.exports = router;
