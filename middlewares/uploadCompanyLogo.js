const multer = require("multer");

const storage = multer.memoryStorage();

const allowedTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const uploadCompanyLogo = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Only JPG, JPEG, PNG and WEBP files are allowed"),
        false
      );
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

module.exports = uploadCompanyLogo;