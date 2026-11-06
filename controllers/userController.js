const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("../config/cloudinary");
const Application = require("../models/application");

const registerController = async (req, res) => {
  try {
    const { fullName, email, password, phone, role } = req.body;

    //! validdate
    if (!fullName || !email || !password || !phone || !role) {
      return res.status(400).send({
        success: false,
        message: "Required all fields!",
      });
    }

    if (password.length < 8) {
      return res.status(400).send({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const existingUser = await User.findOne({ email });

    // * Validation for Existing User
    if (existingUser) {
      return res.status(409).send({
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
    });

    await newUser.save();

    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).send({
      success: true,
      message: "User Register",
      user: userResponse,
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

    //!  VALIDATE DATA
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email or password",
      });
    }

    const user = await User.findOne({ email });
    //? validate
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    //? Validation for compare password
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials",
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
        role: user.role,
        // fullname: user.fullname,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Login API",
    });
  }
};

const getProfile = (req, res) => {
  try {
    const userResponse = req.user.toObject();
    delete userResponse.password;

    return res.status(200).send({
      success: true,
      message: "Profile fetched Successfully",
      user: userResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const updateProfile = async (req, res) => {
  // console.log(cloudinary);
  // console.log(cloudinary.uploader);
  try {
    let { fullName, phoneNumber, bio, skills } = req.body;

    const user = req.user;

    if (fullName !== undefined) {
      if (
        typeof fullName !== "string" ||
        fullName.trim().length < 3 ||
        !/^[A-Za-z ]+$/.test(fullName.trim())
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Name must be at least 3 characters and contain only letters",
        });
      }
    }

    if (phoneNumber !== undefined && !/^\d{10}$/.test(phoneNumber)) {
      return res.status(400).send({
        success: false,
        message: "Phone must be at least 10 digits",
      });
    }

    if (skills !== undefined) {
      const skillList = skills.split(",").map((skill) => skill.trim());

      if (skillList.some((skill) => skill === "")) {
        return res.status(400).send({
          success: false,
          message: "Skills cannot be empty",
        });
      }

      if (skillList.some((skill) => skill.length > 30)) {
        return res.status(400).send({
          success: false,
          message: "Each skill must be 30 characters or less",
        });
      }

      const normalzedSkill = skillList.map((skill) => skill.toLowerCase());

      const uniqueSkills = new Set(normalzedSkill);

      if (normalzedSkill.length > uniqueSkills.size) {
        return res.status(400).send({
          success: false,
          message: "Duplicate skills are not allowed",
        });
      }

      if (skillList.length > 15) {
        return res.status(400).send({
          success: false,
          message: "Maximum 15 skill must be allowed",
        });
      }

      user.skills = skillList;
    }

    if (bio !== undefined && bio.length > 500) {
      return res.status(400).send({
        success: false,
        message: "Bio must be 500 characters or less",
      });
    }

    //?from isAuthenticated Middleware

    //from request.file
    const file = req.file;

    //! Upload resume if provided
    if (file) {
      const fileUri = getDataUri(file);

      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw",
        folder: "job-portal/resumes",
      });

      user.resume = cloudResponse.secure_url;
      user.resumeOriginalName = file.originalname;
    }

    //* Convert skills string into array
    if (skills) {
      skills = skills.split(",").map((skill) => skill.trim());
      user.skills = skills;
    }

    //?. Update only provided fields
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

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: userResponse,
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
      return res.status(400).send({
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

    if (!currentPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).send({
        success: false,
        message: "New password must be at least 8 characters",
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).send({
        success: false,
        message: "New password must be different from current password",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).send({
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

const studentDashboard = async (req, res) => {
  try {
    const [
      totalApplications,
      pendingApplications,
      acceptedApplications,
      rejectedApplications,
    ] = await Promise.all([
      Application.countDocuments({
        applicant: req.user._id,
      }),
      Application.countDocuments({
        applicant: req.user._id,
        status: "Applied",
      }),
      Application.countDocuments({
        applicant: req.user._id,
        status: "Accepted",
      }),
      Application.countDocuments({
        applicant: req.user._id,
        status: "Rejected",
      }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Student dashboard fetched successfully",
      data: {
        totalApplications,
        pendingApplications,
        acceptedApplications,
        rejectedApplications,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

module.exports = {
  getProfile,
  registerController,
  loginController,
  updateProfile,
  updateProfilePhoto,
  logoutController,
  changePassword,
  studentDashboard,
};
