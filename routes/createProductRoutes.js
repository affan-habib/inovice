const upload = require("../config/multer");
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductBySearch,
  getProductBySearchFilter,
  list,
} = require("../controller/createProductControllar");
const validateFile = require("../middleware/validateFile");
const createProductValidator = require("../validator/createProductValidator");
const router = require("express").Router();

router.post(
  "/create-product",
  upload.array("file"),
  createProductValidator,
  createProduct
);
router.put("/update-product/:id", upload.array("file"), updateProduct);
router.delete("/delete-product/:id", deleteProduct);
router.get("/get-product", getProduct);
router.post("/search", getProductBySearch);
router.post("/searchFilter", getProductBySearchFilter);
router.post("/products", list);

module.exports = router;
