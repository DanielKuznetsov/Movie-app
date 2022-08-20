const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");
// const cloudinary = require("cloudinary");
// const Movie = require("./models/movieModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  `<PASSWORD>`,
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, { useUnifiedTopology: true }).then(() => {
  console.log("DB connection is established!");
});

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// sadfasfsda
