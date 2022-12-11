const Order = require("../model/orderModel");

exports.orderTracking = async (req, res, next) => {
  try {
    const orderTracking = await Order.findOne({
      orderId: req.params.trackingId,
      email: req.params.email
    });
    if (orderTracking) {
      return res.json(orderTracking);
    }

    if (!orderTracking) {
      return res.json({
        message: "Order ID is not found",
      });
    }
  } catch (error) {
    next(error);
  }
};
