const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");
const {
  getAllUser,
  getUserById,
  deleteUser,
  getAllCompanies,
  deleteCompany,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/users", isAuthenticated, isAdmin, getAllUser);

router.get("/users/:userId", isAuthenticated, isAdmin, getUserById);

router.delete("/users/:userId", isAuthenticated, isAdmin, deleteUser);

router.get("/companies", isAuthenticated, isAdmin, getAllCompanies);

router.delete("/companies/:companyId", isAuthenticated, isAdmin, deleteCompany);

module.exports = router;
