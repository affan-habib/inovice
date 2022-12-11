const { validationResult } = require("express-validator");
const validationErrorMsg = require("../config/validationErrorMsg");
const Order = require("../model/orderModel");

exports.orderController = async (req, res, next) => {
  const error = validationResult(req).formatWith(validationErrorMsg);
  if (!error.isEmpty()) {
    console.log(error.mapped())
    return res.json({
      error: error.mapped(),
    });
  }
  try {
    const order = await new Order(req.body);
    const orderCreated = await order.save();
    if (orderCreated) {
      return res.json({
        success: "Order submitted !",
      });
    } else {
      return res.json({
        message: "Order not submit",
      });
    }
  } catch (error) {
    next(error);
  }
};
// order get controller
exports.orderGetController = async (req, res, next) => {
  const { email } = req.params;
  console.log(req.user)
  try {
    const orders = await Order.find({ email: email });
    if (orders) {
      return res.json(orders);
    }
  } catch (error) {
    next(error);
  }
};
