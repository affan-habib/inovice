const { Schema, model } = require("mongoose");
const orderModel = new Schema({
  orderId: {
    type: String,
    required: true,
  },
  orderDate: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
  },
  paymentStatus: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  shippingFees: {
    type: Number,
    required: true,
  },
  shipping: {
    mobile: {
      type: String,
      requird: true,
      minLength: 11,
      maxLength: 11,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  product: [Schema.Types.Mixed],
  payment: {
    methodName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    trxId: {
      type: String,
      required: true,
    },
  },
});

const Order = model("order", orderModel);
module.exports = Order;
