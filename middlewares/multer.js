const multer = require("multer");

const storage = multer.memoryStorage();

const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC and DOCX files are allowed"), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;
