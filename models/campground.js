// Imports
const mongoose = require('mongoose');
const Review = require('./reviews')
// Create shorter reference for schema so I don't have to type mongoose everytime
const Schema = mongoose.Schema;


// Creating the campground schema
const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    reviews: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

// Middleware to remove camp and reviews
CampgroundSchema.post('findOneAndDelete', async function(doc) {
    if(doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

// Export the model to connect to mongoose
module.exports = mongoose.model('Campground', CampgroundSchema);
