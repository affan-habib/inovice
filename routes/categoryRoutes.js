const upload = require("../config/multer");
const {
  categoryUpdate,
  categoryDelete,
  getCategory,
  categoryCreate,
} = require("../controller/createCategoryController");
const router = require("express").Router();
router.post("/create-category", upload.single("image"), categoryCreate);
router.put("/update-category/:id", upload.single("image"), categoryUpdate);
router.delete("/delete-category/:id", categoryDelete);
router.get("/get-category", getCategory);
module.exports = router;
