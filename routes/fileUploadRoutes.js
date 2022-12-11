const upload = require("../config/multer");
const {
  fileUpload,
  singleUpload,
} = require("../controller/fileUploadController");
const router = require("express").Router();
const validateFile = require("../middleware/validateFile");

router.post("/file-upload", upload.array("file"), fileUpload);
router.post("/single-upload", upload.single("image"), singleUpload);

module.exports = router;
