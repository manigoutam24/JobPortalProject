const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  applyForJob,
  getMyApplications,
  getApplicants,
  updateApplicationStatus,
  deleteApplication,
} = require("../controllers/applicationController");

const router = express.Router();

router.post("/apply/:jobId", isAuthenticated, applyForJob);

router.get("/my-applications", isAuthenticated, getMyApplications);

router.get("/job/:jobId/applicants", isAuthenticated, getApplicants);

router.patch(
  "/:applicationId/status",
  isAuthenticated,
  updateApplicationStatus,
);

router.delete("/:applicationId", isAuthenticated, deleteApplication);

module.exports = router;
