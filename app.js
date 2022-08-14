const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const viewRouter = require("./routes/viewRoutes");
const movieRouter = require("./routes/movieRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utilities/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// Setting up "Pug"
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views/pug-templates")); // joining directory name /views

app.use(express.static(`${__dirname}`)); // ! for CSS to work

app.use(express.json({ limit: "10kb" })); // Body parser, reading data from the body into req.body; body larger 10kb won't be accepted
app.use(cookieParser()); // data from cookies

app.use("/", viewRouter);
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/users", userRouter);

// Handling unknown routes ––– must be at the end of all routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)); // will skip all other middlewares in the stack and go straight to the next one down below
});

// Middleware error handling
app.use(globalErrorHandler);

module.exports = app;
