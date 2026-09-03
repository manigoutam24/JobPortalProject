const Company = require("../models/companyModel");
const JobModel = require("../models/jobModel");

const jobCreateController = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      skills,
      position,
      companyId,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experienceLevel ||
      !skills ||
      !position ||
      !companyId
    ) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(400).send({
        success: false,
        message: "Company not found with this ID",
      });
    }

    const ownerShip = company.createdBy.equals(req.user._id);
    if (!ownerShip) {
      return res.status(403).send({
        success: false,
        message: "You are not authorized...",
      });
    }

    await JobModel.create({
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      skills,
      position,
      company: companyId,
      createdBy: req.user._id,
    });

    return res.status(201).send({
      success: true,
      message: "Job Created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Create job API",
    });
  }
};

const getAllJob = async (req, res) => {
  try {
    const {
      keyword,
      location,
      minSalary,
      maxSalary,
      jobType,
      experienceLevel,
      skills,
      page = 1,
      limit = 10,
    } = req.query;

    const skip = (page - 1) * Number(limit);

    let query = {};

    if (jobType) {
      query.jobType = jobType;
    }

    if (experienceLevel) {
      query.experienceLevel = experienceLevel;
    }

    if (skills) {
      query.skills = {
        $in: [skills],
      };
    }

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { skills: { $regex: keyword, $options: "i" } },
      ];
    }

    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (minSalary || maxSalary) {
      query.salary = {};

      if (minSalary) {
        query.salary.$gte = Number(minSalary);
      }

      if (maxSalary) {
        query.salary.$lte = Number(maxSalary);
      }
    }

    const totalJobs = await JobModel.countDocuments(query);
    const totalPages = Math.ceil(totalJobs / Number(limit));

    const jobs = await JobModel.find(query)
      .skip(skip)
      .limit(Number(limit))
      .populate("company");

    return res.status(200).send({
      success: true,
      message: "Jobs fetched successfully",
      totalJobs,
      currentPage: Number(page),
      totalPages,
      jobsPerPage: Number(limit),
      jobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get Jobs API",
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await JobModel.findById(jobId).populate("company");
    if (!job) {
      return res.status(404).send({
        success: false,
        message: "Jobs not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Job fetched successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get Job By ID API",
    });
  }
};

const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      skills,
      position,
    } = req.body;

    const job = await JobModel.findById(jobId).populate("company");
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
        message: "Un-Authorized access",
      });
    }

    const updatedJob = await JobModel.findByIdAndUpdate(
      jobId,
      {
        title,
        description,
        requirements,
        salary,
        location,
        jobType,
        experienceLevel,
        skills,
        position,
      },
      { new: true },
    );

    return res.status(200).send({
      success: true,
      message: "Job update Successfully",
      updatedJob,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Update job API",
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    if (!jobId) {
      return res.status(400).send({
        success: false,
        message: "Job ID is required",
      });
    }

    const job = await JobModel.findById(jobId);

    if (!job) {
      return res.status(404).send({
        success: false,
        message: "Job not found",
      });
    }

    const ownership = job.createdBy.equals(req.user._id);
    if (!ownership) {
      return res.status(403).send({
        success: false,
        message: "Un-Authorized access can't delete",
      });
    }

    const deletedJob = await JobModel.findByIdAndDelete(jobId);

    return res.status(200).send({
      success: true,
      message: "Job Deleted successfully",
      deletedJob,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Delete Job API",
    });
  }
};

module.exports = {
  jobCreateController,
  getAllJob,
  getJobById,
  updateJob,
  deleteJob,
};
