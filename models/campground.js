// Imports
const mongoose = require('mongoose');
// Create shorter reference for schema so I don't have to type mongoose everytime
const Schema = mongoose.Schema;

// Creating the campground schema
const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String
});

// Export the model to connect to mongoose
module.exports = mongoose.model('Campground', CampgroundSchema);
