//  imports
const { urlencoded } = require('express');
const express = require('express');
const path = require('path');
const PORT = 5500;
// Create create app 
const app = express();

// Setting up EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

// Creating route for homepage
app.get('/', (req, res) => {
    res.render('home');
})

// Set server port
app.listen(PORT, () => {
    console.log(`Serving on port: ${PORT}`)
})