const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb is connected ${mongoose.connection.host}`.bgWhite);
  } catch (error) {
    console.error("Error Name:", error.name);
    console.error("Error Message:", error.message);
    console.log(error);
  }
};

module.exports = connectDB;
