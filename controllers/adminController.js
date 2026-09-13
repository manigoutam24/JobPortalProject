const User = require("../models/userModel");

const getAllUser = async (req, res) => {
  try {
    // console.log("USER:", req.user);
    // console.log("ROLE:", req.user.role);

    const users = await User.find();

    // console.log("USERS:", users);

    if (users.length === 0) {
      return res.status(401).send({
        success: false,
        message: "Users not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Users fetch Successfully",
      users,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User fetch Successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not Found",
      });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    return res.status(200).send({
      success: true,
      message: "User Delete Successfully",
      deletedUser,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { getAllUser, getUserById, deleteUser };
