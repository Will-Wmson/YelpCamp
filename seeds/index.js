// This is a separate file from the node.js app for the purpse of seeding some data
// for development purposes

//  imports
const PORT = 5500;
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp-camp");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

// connection to mongoose
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

// Emptying the DB and then Seeding with new data
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "61bb5c9dcbf16773b7108886",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)}, ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil dolores reiciendis odit repellendus, quod consequatur eius modi officia fuga dolorem, perferendis, laudantium earum iste amet. Provident magni unde placeat asperiores!",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
