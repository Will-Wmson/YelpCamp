//  imports
const express = require("express");
const path = require("path");
const PORT = 5500;
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp-camp");
const Campground = require('./models/campground');

// connection to mongoose
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

// Create create app
const app = express();

// Setting up EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Creating route for homepage
app.get("/", (req, res) => {
  res.render("home");
});

// Creating route for homepage
app.get("/makecampground", async (req, res) => {
    const camp = new Campground({title: 'My Backyard', description: 'free camping'});
    await camp.save();
    res.send(camp);
  });

// Set server port
app.listen(PORT, () => {
  console.log(`Serving on port: ${PORT}`);
});
