const User = require("../models/userModel");

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

    // * Validation
    if (existingUser) {
      return res.status(404).send({
        success: false,
        message: "User Already exist",
      });
    }

    //? save
    const newUser = await User({
      fullName,
      email,
      password,
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

    res.status(201).send({
      success: true,
      message: "Login Successful",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Login API",
    });
    console.log(error);
  }
};
module.exports = {
  registerController,
    loginController,
};
