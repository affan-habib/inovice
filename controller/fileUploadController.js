const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// file upload
exports.fileUpload = async (req, res, next) => {
  const uploader = async (path) =>
    await cloudinary.uploads(path, "product-images");
  try {
    if (req.method === "POST") {
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);
      }
      res.json({
        message: "Image uploaded successfully",
        urls,
      });
    } else {
      res.json({
        error: "Images not uploaded !",
      });
    }
  } catch (error) {
    next(error);
  }
};
// single file upload
exports.singleUpload = async (req, res) => {
  const uploader = async (path) =>
    await cloudinary.uploads(path, "others-images");
  if (req.method === "POST") {
    const path = req.file.path;
    const newPath = await uploader(path);
    if (newPath) {
      fs.unlinkSync(path);
      return res.json(newPath);
    }
    if (!newPath) {
      return res.json({
        wrong: "File doesn't upload",
      });
    }
  }
};
