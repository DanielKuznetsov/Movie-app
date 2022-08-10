const express = require("express");
const homeRouter = require("./routes/homeRoutes");
const movieRouter = require("./routes/movieRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use("/", homeRouter);
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
