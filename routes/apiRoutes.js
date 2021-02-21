const path = require('path');
const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Get route
router.get("/notes",(req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
    });

 // Post Route   
router.post('/notes', (req, res) => {
    let newNote = req.body;
    let notes = fs.readFileSync('./db/db.json');
    newNote.id = uuidv4();
    notes = JSON.parse(notes);
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));   
    res.json(notes);
});

// Delete Route
router.delete('/notes/:id', (req, res) => {
    let noteId = req.params.id;
    notes = fs.readFileSync('./db/db.json');
    notes = JSON.parse(notes);
    notes = notes.filter((note) => {
        if(noteId === note.id) {
            return false;   
        } else {
            return true;
        }
    })
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);
});


module.exports = router;