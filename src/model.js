const mongoose = require("mongoose");

// Define a schema for storing first name and email
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

});

// Create a model based on the schema
const User = mongoose.model("users", userSchema);

module.exports = User;
