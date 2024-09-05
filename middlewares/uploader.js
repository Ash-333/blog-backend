require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "postImg",
    format: async (req, file) => {
      const format = file.mimetype.split("/")[1];
      return format;
    },
    public_id: (req, file) => {
      const uniqueFilename =
        Date.now() + "-" + file.originalname.replace(/\..+$/, "");
      return uniqueFilename;
    },
  },
});

const uploader = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."));
    }
  },
  limits: { fileSize: 20 * 1024 * 1024 },
});

module.exports = uploader;
