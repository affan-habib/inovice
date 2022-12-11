const router = require("express").Router();
const {
  orderController,
  orderGetController,
} = require("../controller/orderController");
const orderValidator = require("../validator/orderValidator");

router.post("/order-create", orderValidator, orderController);
router.get("/orderGet/:email", orderGetController);
module.exports = router;
