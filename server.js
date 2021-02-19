const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());


// api routes

app.get("/api/notes",(req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
    });

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    let notes = fs.readFileSync('db/db.json');
    newNote.id = uuidv4();
    console.log(newNote.id);
    notes = JSON.parse(notes);
    notes.push(newNote);
    fs.writeFileSync('db/db.json', JSON.stringify(notes));   
    res.json(notes);
    console.log(notes);

});

app.delete('/api/notes/:id', (req, res) => {
    let noteId = req.params.id;
    console.log(noteId);
    notes = fs.readFileSync('db/db.json');
    notes = JSON.parse(notes);
    notes = notes.filter((note) => {
        if(noteId === note.id) {
            return false;   
        } else {
            return true;
        }
    })
        fs.writeFileSync('db/db.json', JSON.stringify(notes));
        res.json(notes);
});

// html routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})






app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});