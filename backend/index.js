const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const userRouter = require("./Routes/userRoutes");
const transactionsRouter = require("./Routes/transactionRoutes");
const categoryRouter = require("./Routes/categoryRoutes");

const port = process.env.PORT || 5000;
const MONGODB_URL = process.env.DBURL;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/categories", categoryRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).send("Welcome");
  });
}

mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.once("open", () => console.log("Connected to DB"));

app.listen(port, () => console.log(`Server running on port ${port}`));
