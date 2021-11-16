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
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)}, ${sample(places)}`,
    });
    await camp.save();
  }
};

seedDB().then(() => {
    mongoose.connection.close();
});
