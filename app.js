const express = require("express");
const homeRouter = require("./routes/homeRoutes");
const movieRouter = require("./routes/movieRoutes");

const app = express();

app.use("/", homeRouter);
app.use("/api/v1/movies", movieRouter);

module.exports = app;
