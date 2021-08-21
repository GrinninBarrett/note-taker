const express = require('express');
const path = require('path');
const uuid = require('uuid');
const notesData = require('./db/db.json');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set public folder
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    console.info(`${req.method} request received to get notes`);
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.post('/notes', (req, res) => {

    console.info(`${req.method} request received to add a note`);
    
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid()
        };

        const response = {
            status: 'success',
            body: newNote
        };

        console.log(response);
        response.json(response);
        
    } else {
        res.json('Error in adding note');
    }


});





app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});