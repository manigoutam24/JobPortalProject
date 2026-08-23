const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    requirements: {
      type: String,
      required: true,
      trim: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    jobType: {
      type: String,
      required: true,
      enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
    },

    experienceLevel: {
      type: String,
      required: true,
      enum: ["Fresher", "Junior", "Mid-Level", "Senior"],
    },

    skills: {
      type: [String],
      required: true,
    },

    position: {
      type: Number,
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const JobModel = mongoose.model("Job", jobSchema);

module.exports = JobModel;
