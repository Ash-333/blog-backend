// db.js
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const mongoURI = process.env.MONGO_DB_URI;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  try {
    mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(console.log("connected to db"))
  .catch((err) => console.log(err));
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
