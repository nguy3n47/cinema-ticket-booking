require("dotenv").config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import expressValidator from "express-validator";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";

import models from "./models";

import authRoute from "./routers/authRoute";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(cors());

// Session
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY || "secret"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(express.static("public"));

// Route
app.use("/api/auth", authRoute);

app.use("*", (req, res) => {
  res.status(404).json({
    error: "NotFound",
  });
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res
      .status(401)
      .json({ error: "Unauthorized", message: err.message });
  }
  if (err.status && err.name) {
    return res.status(err.status).send({
      message: err.message,
    });
  }
  res.status(500).json({
    message: "Internal server error",
    error: err.message,
  });
  next();
});

const hostname = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 5000;

app.listen(port, async () => {
  try {
    await models.sequelize.sync();
    console.log("Database connected!");
    console.log(`Server running at http://${hostname}:${port}/`);
  } catch (error) {
    console.log("Failed to start server!");
    console.log(error);
  }
});
