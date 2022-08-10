const mongoose = require("mongoose");
const dotenv = require("dotenv"); // !
const fs = require("fs");

const Movie = require("../../models/moviesModel");
const User = require("../../models/userModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  `<PASSWORD>`,
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, { useUnifiedTopology: true }).then((connection) => {
  console.log("DB connection is established");
});

const movies = JSON.parse(fs.readFileSync(`${__dirname}/movies.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

// IMPORT A COLLECTION
const importData = async () => {
  try {
    await Movie.create(movies);
    await User.create(users);
    console.log("Data successfully loaded");
    process.exit();
  } catch (err) {
    console.error(err.message);
  }
};

// DELETE DATA
const deleteData = async () => {
  try {
    await Movie.deleteMany();
    await User.deleteMany();
    console.log("Data successfully deleted");
    process.exit();
  } catch (err) {
    console.error(err.message);
  }
};

if (process.argv[2] === "--import") {
  // node dev-data/data/import-dev-data.js (--import/--delete)
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
