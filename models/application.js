const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    status: {
      type: String,
      enum: ["Applied", "Accepted", "Rejected"],
      default: "Applied",
    },
  },
  {
    timestamps: true,
  },
);

applicationSchema.index(
  { applicant: 1, job: 1 },
  {
    unique: true,
  },
);

applicationSchema.index({ job: 1, createdAt: -1 });

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
