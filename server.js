const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const notes = require('./db/db.json');

const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });


// This is used to show the notes.html file when the button on the landing page is clicked
app.get('/notes', (req, res) => {
    console.info(`${req.method} request received to get notes`);
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// This is used for actually adding new notes to the db.json file
app.get('/api/notes', (req, res) => {
    return res.json(notes);
});


app.post('/notes', (req, res) => {

    console.info(`${req.method} request received to add a note`);
    
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text
            //TODO: Add id to new notes using uuid
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

        const response = {
            status: 'success',
            body: newNote
        };

        console.log(response);
        res.json(response);
        
    } else {
        res.json('Error in adding note');
    }
});




app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});