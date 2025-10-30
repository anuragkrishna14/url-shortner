const express = require("express");
const app = express();
require("dotenv").config();
const limiter = require("./middlewares/rateLimiter");
const urlRoute = require("./routes/urlRoute");

const connectDb = require("./config/connectDb");


app.use(express.json());
app.use(limiter);
app.use("/", urlRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDb();
  console.log("Server is running on port: " + PORT);
})