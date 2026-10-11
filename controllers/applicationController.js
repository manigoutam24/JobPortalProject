const { default: mongoose } = require("mongoose");
const Application = require("../models/application");
const JobModel = require("../models/jobModel");

const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

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
    const currentUserId = req.user._id;

    if (!currentUserId) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

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

    const applications = await Application.find({ job: jobId }).populate(
      "applicant",
    );

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
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const { status } = req.body;

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
