// Require Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

// Initializiing the express app
const app = express();
const PORT = process.env.PORT || 3000;

<<<<<<< HEAD
// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

//Routes file 
require('./routes/routes')(app);

// listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  
=======
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
>>>>>>> parent of fb7eabc (server.js changes)
