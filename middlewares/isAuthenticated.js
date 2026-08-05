//!step1
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//!step2
const isAuthenticated = async (req, res, next) => {
  try {
    //!step3
    const token = req.cookies.token;

    //!step4
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    //!step5
    const verifyToken = jwt.verify(token, process.env.SECRET);
    // console.log(verifyToken);

    //!step6
    const user = await User.findById(verifyToken.id).select("-password");

    //!step7
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = isAuthenticated;
