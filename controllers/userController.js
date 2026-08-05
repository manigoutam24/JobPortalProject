const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const test = (req, res) => {
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
  try {
    const user = req.user;
    // console.log(user);

    let { fullName, phoneNumber, bio, skills } = req.body;

    if (skills) {
      skills = skills.split(",").map((skill) => skill.trim());
    }

    if (skills) {
      user.skills = skills;
    }

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

    return res.status(200).send({
      success: true,
      message: "Profile Update Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Someting went wrong",
    });
  }
};

module.exports = {
  test,
  registerController,
  loginController,
  updateProfile,
};
