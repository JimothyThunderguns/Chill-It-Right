const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 1967

// unblock static folder so browser can request resources
app.use(express.static('public'))
app.use(express.json())

//======================================================
// API routes
//======================================================

// GET Request
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf-8', function(err, data) {
        if (err) {
            res.status(500).json({ error: "error" })
            return
        }
        res.json(JSON.parse(data))
    })
})

// Post Request
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body

    if (!title || !text) {
        res.status(400).json({ error: "Missing title and/or text!" })
        return
    }

    const newNote = {
        ...req.body,
        id: Math.random()
    }

    // read the db.json
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf-8', function(err, data) {
        if (err) {
            res.status(500).json(err)
            return
        }
        // JSON string parse
        const noteData = JSON.parse(data)

        // push the new note into json
        noteData.push(newNote)

        // stringify notes and save the file
        fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(noteData), function (err) {
            if (err) {
                res.status(500).json(err)
                return
            }
            res.status(200).json(newNote)
        })
    })
})

// DELETE

app.delete('/api/notes/:id', (req, res) => {
    // read all notes from db.json 
    fs.readFile(path.join(__dirname, "db", "db.json"), "utf-8", function(err, data) {
        if (err) {
            res.status(500).json(err)
            return
        }
        const { id } = req.params
        let noteData = JSON.parse(data)

        //delete note property 
        const noteDelete = noteData.find(note => note.id == id)

        // Delete a note with a selected property
        if (!noteDelete) {
            res.status(400).json({ error: "We need an id." })
            return
        } else {
            noteData = noteData.filter(note => note.id != id)
        }

        // Notes are rewritten into the db.json file here
        fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(noteData), function (err) {
            if (err) {
                res.status(500).json(err)
                return
            }
            res.json(noteData)
        })
    })
})

//======================================================
// VIEW ROUTES
//======================================================

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Notes route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"))
})

//Listener
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})