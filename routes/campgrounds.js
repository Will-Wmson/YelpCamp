const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const campgrounds = require("../controllers/campgrounds");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");

// Creating different routes for different campgrounds
router.get("/", catchAsync(campgrounds.index));

// Create route to server from for editing a campground
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

// Create route to recieve data from the form using Joi to validate entries before sending to mongoose
router.post(
  "/",
  isLoggedIn,
  validateCampground,
  catchAsync(campgrounds.createCampground)
);

//  Create route for a details campground page
router.get("/:id", catchAsync(campgrounds.showCampground));

// Create route for editing campgrounds
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

// Create a route to update campground
router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateCampground,
  catchAsync(campgrounds.updateCampground)
);

// Create a route to delete campground
router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.deleteCampground)
);

module.exports = router;
