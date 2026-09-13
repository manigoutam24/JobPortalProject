const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");
const { getAllUser, getUserById, deleteUser } = require("../controllers/adminController");

const router = express.Router();

router.get("/users", isAuthenticated, isAdmin, getAllUser);

router.get("/users/:userId", isAuthenticated, isAdmin, getUserById);

router.delete("/users/:userId", isAuthenticated, isAdmin, deleteUser);

module.exports = router;
