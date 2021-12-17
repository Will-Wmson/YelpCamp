if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//  imports
const express = require("express");
const path = require("path");
const PORT = 5500;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const userRoutes = require("./routes/users");
const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
mongoose.connect("mongodb://localhost:27017/yelp-camp");

// connection to mongoose
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

// Create create app
const app = express();

// Setting up EJS
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// setup sessions
const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUnitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Setup Parser
app.use(express.urlencoded({ extended: true }));
// Setup method-Override to use PUT
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Middleware to handle flash messages
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", userRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

// Creating route for homepage
app.get("/", (req, res) => {
  res.render("home");
});

// Middleware error message
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// Middleware error message
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

// Set server port
app.listen(PORT, () => {
  console.log(`Serving on port: ${PORT}`);
});
