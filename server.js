require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const app = express();

//mongodbConnection
connectDB();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

//routes
app.use("/user", require("./routes/userRoute"));
app.use("/company", require("./routes/companyRoute"));
app.use("/job", require("./routes/jobRoute"));
app.use("/application", require("./routes/applicationRoute"));
app.use("/admin", require("./routes/adminRoute"));
app.use("/recruiter", require("./routes/recruiterRoute"));

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size must be less than 2 MB",
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err.message === "Only jpg, jpeg, png and webp files are allowed") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate value already exists",
    });
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  console.error(err.stack || err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
