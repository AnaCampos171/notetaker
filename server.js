//require necessary packages -- find package to give note a unique id uuid
//extra: add the delete route 
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
//utilize express and set port
const app = express();
const PORT = process.env.PORT || 3000;
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
//serve notes.html file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});
//read notes from db.json file and return as JSON
app.get('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json')));
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
    //create new note object with unique id
  const newNote = {
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text
  };
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json')));
  notes.push(newNote); // add new note to array
  fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes));
  res.json(newNote); //new note sent as a JSON response
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
