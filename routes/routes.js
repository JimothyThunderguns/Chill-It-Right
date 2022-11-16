const fs = require('fs');
const { join } = require('path');
const path = require('path');

module.exports = app => {

    //set up the notes variable
    fs. readFile("db/db.json", "utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);

//API routes
//------------------------------------------------------------------------------

        app.get("/api/notes", function(req, res) {
            res.json(notes);
        });

        //creating the /api/notes post route
        app.post("/api/notes", (req, res) {


            let newNotes = req.body;

            notes.push(newNotes);

            updateDb();

                return console.log("Added new note: "+newNote.title);
                

        });
        // retrieves a specific note by id
        app.get("/api/notes/:id", function(req,res) {
            //display json 
            res.json(notes[req.params.id]);
        });

        // retrieves a specific note by id
        app.delete("/api/notes/:id", function(req,res) {
            notes.splice(req.params.id, 1);
            updateDb();
            res.json(notes[req.params.id]);
            console.log("Deleted" +req.params.id);
        });

        //View route
        //-------------------------------------------------------------------------------------------------------------------------------

        //Displays the notes.html
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        // joins the routes accessed to index html display
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //updates json file for adding and deleting
        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'), err =>{
                if (err) throw err;
            });
        }
    });
}