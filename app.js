const express = require("express");
const app = express();
const port = 4000;
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.bwphjz4.mongodb.net/?retryWrites=true&w=majority`;
// Import custom routes
const authRoutes = require("./routes/authRoutes");
const userUpdateRoutes = require("./routes/userUpdateRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productReviewRoutes = require("./routes/productReviewRoutes");
const createProductRoutes = require("./routes/createProductRoutes");
const createCategory = require("./routes/categoryRoutes");
const orderTracking = require("./routes/orderTrackingRoutes");
const fileUpload = require("./routes/fileUploadRoutes");
// cors origin
// middlewar package
const middlewar = [
  cors(),
  express.urlencoded({ extended: true }),
  express.json(),
];

// middlewar assets
app.use(middlewar);
app.use("/", authRoutes);
app.use("/", userUpdateRoutes);
app.use("/", orderRoutes);
app.use("/", orderTracking);
app.use("/", productReviewRoutes);
app.use("/", createProductRoutes);
app.use("/", createCategory);
app.use("/", fileUpload);
// database connection check
app.get("/", (req, res) => {
  res.send("<h1>Welcome To Database</h1>");
});
// database connect using mongoose
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(
      process.env.PORT || port,
      console.log(`Server is Running on PORT ${port}`)
    );
  });
