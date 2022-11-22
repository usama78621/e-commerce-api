require("express-async-errors");
require("dotenv").config();
const express = require("express");
const app = express();

// error handler evoid use of try catch balog
// import connect file DB
const connectDB = require("./db/connect");

const authRouter = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const cookieParser = require("cookie-parser");
// express incomeing req and res in json
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRoutes);

// not found page
app.use(notFound);
app.use(errorHandlerMiddleware);

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
