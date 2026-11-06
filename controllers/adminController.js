const mongoose = require("mongoose");
const Application = require("../models/application");
const Company = require("../models/companyModel");
const JobModel = require("../models/jobModel");
const User = require("../models/userModel");

const getAllUser = async (req, res) => {
  try {
    // console.log("USER:", req.user);
    // console.log("ROLE:", req.user.role);

    const users = await User.find().select("-password");

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

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is not found",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid User ID",
      });
    }

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

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    if (companies.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Companies not exist",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Companies Fetch Successfully",
      companies,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went Wrong",
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!companyId) {
      return res.status(400).send({
        success: false,
        message: "Check your ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Company ID",
      });
    }

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).send({
        success: false,
        message: "Company not found",
      });
    }

    const deletedCompany = await Company.findByIdAndDelete(companyId);

    return res.status(200).send({
      success: true,
      message: "Company deleted Successfully",
      deletedCompany,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobModel.find().populate("company");

    if (jobs.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Jobs Not Found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Something went wrong in API",
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).send({
        success: false,
        message: "Job Id is Required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Job ID",
      });
    }

    const job = await JobModel.findById(jobId);

    if (!job) {
      return res.status(404).send({
        success: false,
        message: "Job not Found",
      });
    }

    const deletedJob = await JobModel.findByIdAndDelete(jobId);

    return res.status(200).send({
      success: true,
      message: "Job deleted successfully",
      deletedJob,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Something Went wrong in API",
    });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("applicant", "-password")
      .populate("job");

    if (applications.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Applications not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Job fetched Successfully",
      applications,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Somethong went Wrong in API",
    });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const { applicationId } = req.params;

    if (!applicationId) {
      return res.status(400).send({
        success: false,
        message: "Application ID required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).send({
        success: false,
        message: "Application Id is not matched",
      });
    }

    const application = await Application.findById(applicationId)
      .populate("applicant")
      .populate("job");

    if (!application) {
      return res.status(404).send({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Application fetched successfully",
      application,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Something went wrong in API",
    });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    if (!applicationId) {
      return res.status(400).send({
        success: false,
        message: "Appliaction ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Application ID",
      });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).send({
        success: false,
        message: "Application not found",
      });
    }

    const deletedApplication =
      await Application.findByIdAndDelete(applicationId);
    return res.status(200).send({
      success: true,
      message: "Application Deleted Successfully",
      deletedApplication,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Internal server Error",
    });
  }
};

const adminDashboardController = async (req, res) => {
  try {
    const [
      totalStudent,
      totalRecruiters,
      totalCompanies,
      totalJobs,
      totalApplications,
    ] = await Promise.all([
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "recruiter" }),
      Company.countDocuments(),
      JobModel.countDocuments(),
      Application.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      message: "Admin dashboard statistics fetched successfully",
      totalStudent,
      totalRecruiters,
      totalCompanies,
      totalJobs,
      totalApplications,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



module.exports = {
  getAllUser,
  getUserById,
  deleteUser,
  getAllCompanies,
  deleteCompany,
  getAllJobs,
  deleteJob,
  getAllApplications,
  getApplicationById,
  deleteApplication,
  adminDashboardController,
};
