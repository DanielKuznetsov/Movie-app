const express = require("express");
const cookieParser = require("cookie-parser");
const homeRouter = require("./routes/homeRoutes");
const movieRouter = require("./routes/movieRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json({ limit: "10kb" })); // Body parser, reading data from the body into req.body; body larger 10kb won't be accepted
app.use(cookieParser()); // data from cookies

app.use("/", homeRouter);
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
