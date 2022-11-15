//Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

//Setting up the Express app

var app = express();
var PORT = process.env.PORT || 3000;

//
app.use(express.static)

//Setting up the data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(__dirname));

//requiring the routes file
require('./routes/routes');

//listener setup
app.listen(PORT, () => {
        console.log ('App listening to PORT : ${PORT}')
});
