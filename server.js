require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const app = express();

//mongodbConnection
connectDB();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

//routes
app.use("/user", require("./routes/userRoute"));

app.listen(process.env.PORT, () => {
  console.log(`Port is listen on ${process.env.PORT}`);
});
