const express = require("express");
const homeRouter = require("./routes/homeRouter");

const app = express();

app.use("/", homeRouter);

module.exports = app;
