const {
  ProductReview,
  ProductReviewGet,
} = require("../controller/productReviewController");
const productReviewValidator = require("../validator/productReviewValidator");

const router = require("express").Router();

router.post("/product-review", productReviewValidator, ProductReview);
router.get("/get-productReview/:productId", ProductReviewGet);
module.exports = router;
