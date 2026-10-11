const { default: mongoose } = require("mongoose");
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

    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).send({
        success: false,
        meassage: "Job ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Job ID",
      });
    }

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

    const updateData = {};

    if (title !== undefined) {
      updateData.title = title;
    }
    if (description !== undefined) {
      updateData.description = description;
    }
    if (requirements !== undefined) {
      updateData.requirements = requirements;
    }
    if (salary !== undefined) {
      updateData.salary = salary;
    }
    if (location !== undefined) {
      updateData.location = location;
    }
    if (jobType !== undefined) {
      updateData.jobType = jobType;
    }
    if (experienceLevel !== undefined) {
      updateData.experienceLevel = experienceLevel;
    }
    if (skills !== undefined) {
      updateData.skills = skills;
    }
    if (position !== undefined) {
      updateData.position = position;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update",
      });
    }

    const updatedJob = await JobModel.findByIdAndUpdate(
      jobId,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      },
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
