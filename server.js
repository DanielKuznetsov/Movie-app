const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");
// const cloudinary = require("cloudinary");
// const Movie = require("./models/movieModel");

dotenv.config({ path: "./config.env" });

// cloudinary.config({
//   cloud_name: "dfgpplsw7",
//   api_key: "977596339658681",
//   api_secret: "IiKEoW7_Mv45pVom-w3Ai3rveMI",
// });

// const update = async (req, res, next) => {
//   await Movie.findOneAndUpdate();
// };

// const image = cloudinary.image(
//   "./starter-code/assets/thumbnails/1998/large.jpg"
// );
// console.log(image);

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
