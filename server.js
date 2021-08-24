// Import Express, path, fs
const express = require('express');
const path = require('path');
const fs = require('fs');

// Import uuid for creating unique IDs for each note
const uuid = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));


// This is used to show the notes.html file when the button on the landing page is clicked
app.get('/notes', (req, res) => {
    console.info(`${req.method} request received to get notes`);
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});


// Get and parse JSON data from db.json
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);

            return res.json(parsedNotes);
        }
    });
});


// Add a new note to db.json from POST request
app.post('/api/notes', (req, res) => {

    console.info(`${req.method} request received to add a note`);
    
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid.v4()
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) => 
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully added note!')
                );
            }
        });

        const successData = {
            status: 'Success',
            body: newNote
        };

        console.log(successData);
        res.json(successData);
        
    } else {
        res.json('Please be sure your note has a title and text in the note body.');
    }
});


// Delete a particular note when called (from clicking the trash icon on a note)
app.delete('/api/notes/:id', (req, res) => {

    console.info(`${req.method} request received to delete a note`);

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);
            const noteToDelete = parsedNotes.filter(note => note.id === req.params.id)[0];

            // Filter to remove deleted note
            const newNotes = parsedNotes.filter(note => note.id !== req.params.id);

            // Write file to update "database" with new list of notes
            fs.writeFile(
                './db/db.json',
                JSON.stringify(newNotes, null, 4),
                (writeErr) => 
                    writeErr
                        ? console.error(writeErr)
                        : console.info('Successfully deleted note!')
            );

            const successData = {
                status: "Success",
                msg: "Note deleted",
                body: noteToDelete
            }

            console.log(successData);
            res.json(successData);
        }
    });
})




app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});