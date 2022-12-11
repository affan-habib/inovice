const { Schema, model } = require("mongoose");

const categoryModel = new Schema({
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
});
const Category = model("category", categoryModel);
module.exports = Category;
