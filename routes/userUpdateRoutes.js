const {
  UserUpdate,
  UserImageUpload,
} = require("../controller/userUpdateController");
const router = require("express").Router();

router.put("/api/user/:email", UserUpdate);
router.put("/api/userImage/:email", UserImageUpload);
module.exports = router;
