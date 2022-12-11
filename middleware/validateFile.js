const validateFile = (req, res, next) => {
  console.log("validate file from ")
  const exceptedFileType = ["png", "jpg", "jpeg"];
  if (!req.file) {
    console.log(req.file)
    return res.json({
      error: "Image is required",
    });
  }
  const fileExtension = req.file.mimetype.split("/").pop();
  if (!exceptedFileType.includes(fileExtension)) {
    return res.json({
      error: "Please submit png, jpg, jpeg file",
    });
  }
  next();
};
module.exports = validateFile;
