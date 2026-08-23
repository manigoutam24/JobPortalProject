const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  jobCreateController,
  getAllJob,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const router = express.Router();

router.post("/create", isAuthenticated, jobCreateController);
router.get("/all", isAuthenticated, getAllJob);
router.get("/:jobId", isAuthenticated, getJobById);
router.put("/:jobId", isAuthenticated, updateJob);
router.delete("/:jobId", isAuthenticated, deleteJob);

module.exports = router;
