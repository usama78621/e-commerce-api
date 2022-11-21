const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// error handler evoid use of try catch balog
require("express-async-errors");
// import connect file DB
const connectDB = require("./db/connect");

// express incomeing req and res in json
app.use(express.json());

// env var
const port = process.env.PORT || 5000;

// start function run any time when server recieve req
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server listeing on port ${port}..`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
