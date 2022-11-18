//Dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

//Setting up the Express app

var app = express();
//Initial port
var PORT = process.env.PORT || 3000;

//Setting up the data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

//requiring the routes file
require('./routes/routes')(app);

//listener setup
app.listen(PORT, function() {
        console.log (`App listening to  http://localhost:${PORT}`)
});
