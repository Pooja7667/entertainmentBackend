const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

console.log(mongoURI);

// Define an asynchronous function to connect to MongoDB
const DBconnect = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);

    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("no connection");
    process.exit(1);
  }
};

module.exports = DBconnect;
