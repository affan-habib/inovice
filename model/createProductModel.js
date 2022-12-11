const { Schema, model } = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const createProduct = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    unit: { type: String, required: true },
    weight: { type: String, required: true },
    tags: { type: String },
    productImage: [Schema.Types.Mixed],
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    sold: { type: Number, default: 0 },
    discount: { type: Number },
    discountType: { type: String },
    sku: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    status: { type: String },
  },
  { timestamps: true }
);
createProduct.plugin(aggregatePaginate);
const product = model("product", createProduct);
module.exports = product;
