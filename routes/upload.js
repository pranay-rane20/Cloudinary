const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");
const router = express.Router();
const { Readable } = require("stream");

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post("/upload", upload.single("avatar"), async (req, res) => {
  try {
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        Readable.from(req.file.buffer).pipe(stream);
      });
    };
    const result = await streamUpload(req);
    res.json({
      message: "Image uploaded successfully",
      url: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

module.exports = router;