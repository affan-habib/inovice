const { orderTracking } = require("../controller/orderTrackingController");

const router = require("express").Router();

router.get("/order-tracking/:trackingId/:email", orderTracking);

module.exports = router;
