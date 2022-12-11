const { validationResult } = require("express-validator");
const validationErrorMsg = require("../config/validationErrorMsg");
const Review = require("../model/productReviewModel");

exports.ProductReview = async (req, res, next) => {
  const error = validationResult(req).formatWith(validationErrorMsg);
  if (!error.isEmpty()) {
    return res.json({
      error: error.mapped(),
    });
  }
  try {
    const existingReview = await Review.findOne({
      username: req.body.username,
      productId: req.body.productId,
    });
    if (existingReview) {
      existingReview["rating"] = req.body.rating;
      existingReview["description"] = req.body.description;
      existingReview["name"] = req.body.name;
      existingReview["image"] = req.body.image;
      await existingReview.save();
      return res.json({
        success: "Review Update !",
        review: existingReview,
      });
    }
    if (!existingReview) {
      const review = await new Review(req.body);
      const createReview = await review.save();
      if (createReview) {
        return res.json({
          success: "Review Submitted !",
          review,
        });
      }
      if (!createReview) {
        return res.json({
          wrong: "Review Submit failed !",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
// get product review
exports.ProductReviewGet = async (req, res, next) => {
  try {
    const review = await Review.find({ productId: req.params.productId });
    return res.json(review);
  } catch (error) {
    next(error);
  }
};
