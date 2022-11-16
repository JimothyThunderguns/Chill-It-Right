const fs = require('fs');
const path = require('path');

module.exports = app => {

    //set up the notes variable
    fs. readFile("db/db.json", "utf8", (err, data) => {

        if (err) throw err;
    
        var notes = JSON.parse(data);

        //API routes
        //------------------------------------------------------------------------------

        //Setup the route 
        app.get("api/notes")
    })
}