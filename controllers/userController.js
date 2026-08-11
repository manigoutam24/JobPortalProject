const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("../config/cloudinary");

const profile = (req, res) => {
  res.json(req.user);
};

const registerController = async (req, res) => {
  try {
    const { fullName, email, password, role, phone, isVerified } = req.body;

    //! validdate
    if (!fullName || !email || !password || !role || !phone) {
      return res.status(404).send({
        success: false,
        message: "Required all fields!",
      });
    }

    const existingUser = await User.findOne({ email });

    // * Validation for Existing User
    if (existingUser) {
      return res.status(404).send({
        success: false,
        message: "User Already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // console.log(salt);
    // console.log(hashPassword);
    //? save
    const newUser = await User({
      fullName,
      email,
      password: hashPassword,
      role,
      phone,
      isVerified,
    });
    await newUser.save();

    res.status(201).send({
      success: true,
      message: "User Register",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went Wrong",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    //? validate
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Crediantals",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    //? Validation for compare password
    if (!isMatch) {
      return res.status(404).send({
        success: false,
        message: "Invalid Crediantials",
      });
    }

    const token = JWT.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).send({
      success: true,
      message: "Login Successful",
      token,
      user: {
        email: user.email,
        id: user._id,
        // fullname: user.fullname,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Login API",
    });
    console.log(error);
  }
};

const updateProfile = async (req, res) => {
  // console.log(cloudinary);
  // console.log(cloudinary.uploader);
  try {
    let { fullName, phoneNumber, bio, skills } = req.body;

    //from Middleware
    const user = req.user;

    //from request.file
    const file = req.file;

    // Upload resume if provided
    if (file) {
      const fileUri = getDataUri(file);

      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw",
        folder: "job-portal/resumes",
      });

      user.resume = cloudResponse.secure_url;
      user.resumeOriginalName = file.originalname;
    }

    // Convert skills string into array
    if (skills) {
      skills = skills.split(",").map((skill) => skill.trim());
      user.skills = skills;
    }

    // Update only provided fields
    if (fullName) {
      user.fullName = fullName;
    }

    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }

    if (bio) {
      user.bio = bio;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const updateProfilePhoto = async (req, res) => {
  try {
    const user = req.user;
    const file = req.file;

    if (!file) {
      return res.status(401).send({
        success: false,
        message: "Profile photo is required",
      });
    }

    const fileUri = getDataUri(file);

    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: "image",
      folder: "job-portal/profile-photos",
    });

    user.profilePhoto = cloudResponse.secure_url;

    await user.save();

    res.status(200).send({
      success: true,
      message: "ProfilePhoto upload Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Somethink Went Wrong",
    });
  }
};

const logoutController = (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(201).send({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    let { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    const hashNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashNewPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

    // console.log(isMatch);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  profile,
  registerController,
  loginController,
  updateProfile,
  updateProfilePhoto,
  logoutController,
  changePassword,
};
