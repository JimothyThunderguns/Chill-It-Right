//Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db")

//Setting up the Express app

var app = express();
var PORT = process.env.PORT 