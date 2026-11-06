const Application = require("../models/application");
const JobModel = require("../models/jobModel");

const recruiterDashboard = async (req, res) => {
  try {
    const recruiterId = req.user._id;

    // Get recruiter jobs
    const recruiterJobs = await JobModel.distinct("_id", {
      createdBy: recruiterId,
    });

    // Execute queries in parallel
    const [
      totalJobs,
      totalApplicants,
      pendingApplications,
      acceptedApplications,
      rejectedApplications,
    ] = await Promise.all([
      JobModel.countDocuments({ createdBy: recruiterId }),

      Application.countDocuments({
        job: { $in: recruiterJobs },
      }),

      Application.countDocuments({
        job: { $in: recruiterJobs },
        status: "Applied",
      }),

      Application.countDocuments({
        job: { $in: recruiterJobs },
        status: "Accepted",
      }),

      Application.countDocuments({
        job: { $in: recruiterJobs },
        status: "Rejected",
      }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Recruiter dashboard fetched successfully",
      totalJobs,
      totalApplicants,
      pendingApplications,
      acceptedApplications,
      rejectedApplications,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { recruiterDashboard };
