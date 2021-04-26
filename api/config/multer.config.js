const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || "anthillweb",
  api_key: process.env.CLOUDINARY_KEY || "322462519218433",
  api_secret: process.env.CLOUDINARY_SECRET || "6XV7RuJ80qQaev-0ZfeX1tBIu00",
});

const storage = new cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'homelidarity',
  allowedFormats: ['jpeg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;