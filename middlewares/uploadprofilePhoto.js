const multer = require("multer");

const storage = multer.memoryStorage();

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only jpg, jpeg, png and webp files are allowed"), false);
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

module.exports = upload;
