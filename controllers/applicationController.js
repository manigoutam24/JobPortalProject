const { default: mongoose } = require("mongoose");
const Application = require("../models/application");
const JobModel = require("../models/jobModel");

const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).send({
        success: false,
        message: "Job Id is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).send({
        success: false,
        message: "Invlid Job Id",
      });
    }

    const job = await JobModel.findById(jobId);

    if (!job) {
      return res.status(404).send({
        success: false,
        message: "Job not found",
      });
    }

    const application = await Application.findOne({
      applicant: req.user._id,
      job: jobId,
    });

    if (application) {
      return res.status(409).send({
        success: false,
        message: "Application already exists",
      });
    }

    const createdApplication = await Application.create({
      applicant: req.user._id,
      job: jobId,
    });

    return res.status(201).send({
      success: true,
      message: "Application created successfully",
      createdApplication,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getMyApplications = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized",
      });
    }

    const currentUserId = req.user._id;

    const applications = await Application.find({
      applicant: currentUserId,
    }).populate("job");

    if (applications.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No application found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Application found",
      applications,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;
    const totalApplications = await Application.countDocuments({
      job: jobId,
    });

    //! Pagination Methods
    const page = req.query.page === undefined ? 1 : Number(req.query.page);
    const limit = req.query.limit === undefined ? 10 : Number(req.query.limit);
    const totalPages = Math.ceil(totalApplications / limit);
    const skip = (page - 1) * limit;

    if (
      !Number.isInteger(page) ||
      page <= 0 ||
      !Number.isInteger(limit) ||
      limit <= 0 ||
      limit > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid pagination parameters",
      });
    }

    if (!jobId) {
      return res.status(400).send({
        success: false,
        message: "JobId is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).send({
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

    const ownership = job.createdBy.equals(req.user._id);

    if (!ownership) {
      return res.status(403).send({
        success: false,
        message: "Un-Authorized",
      });
    }

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "fullName email skills profilePhoto")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    if (applications.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No application found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Application found",
      totalApplications,
      currentPage: page,
      totalPages,
      limit,
      applications,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;

    if (!applicationId) {
      return res.status(400).send({
        success: false,
        message: "Applicant ID is Required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Application ID",
      });
    }

    const { status } = req.body;

    if (!status) {
      return res.status(400).send({
        success: false,
        message: "Invalid application status",
      });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).send({
        success: false,
        message: "Application not found",
      });
    }

    const job = await JobModel.findById(application.job);

    if (!job) {
      return res.status(404).send({
        success: false,
        message: "job not found",
      });
    }

    const ownership = job.createdBy.equals(req.user._id);

    if (!ownership) {
      return res.status(403).send({
        success: false,
        message: "Un-Authorized",
      });
    }

    const allowedStatus = ["Accepted", "Rejected"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).send({
        success: false,
        message: "Invalid application status",
      });
    }

    application.status = status;

    await application.save();

    return res.status(200).send({
      success: true,
      message: "Status update successful",
      application,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Someting went wrong",
    });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    if (!applicationId) {
      return res.status(400).send({
        success: false,
        message: "Application Id is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid application ID",
      });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).send({
        success: false,
        message: "Application not found",
      });
    }

    const ownership = application.applicant.equals(req.user._id);
    if (!ownership) {
      return res.status(403).send({
        success: false,
        message: "Un-Authorized",
      });
    }

    const deletedApplication =
      await Application.findByIdAndDelete(applicationId);

    return res.status(200).send({
      success: true,
      message: "Application deleted successfully",
      deletedApplication,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getApplicants,
  updateApplicationStatus,
  deleteApplication,
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhN2FiZDNmYzg1NjA5NmIzYjk5ZDQzNCIsImlhdCI6MTc4ODYyMzg2NSwiZXhwIjoxNzg4NzEwMjY1fQ.ZgsNMoHL_8lefctJbjZktXgbWdZbYYGNziVFqlA-cgY
