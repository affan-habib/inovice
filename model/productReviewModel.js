const { Schema, model } = require("mongoose");

const productReview = new Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  reviewDate: {
    type: String,
    default: new Date().toString().split(" ").splice(1, 3).join(" "),
  },
  image: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const Review = model("productReview", productReview);
module.exports = Review;
