require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

//mongodbConnection
connectDB();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/user", require("./routes/userRoute"));

app.listen(process.env.PORT, () => {
  console.log(`Port is listen on ${process.env.PORT}`);
});
