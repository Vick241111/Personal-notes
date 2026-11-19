const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();c 
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'notes.json');

app.use(express.json());

// read notes from file
function readNotes() {
const data = fs.readFileSync(FILE_PATH, 'utf8');
return JSON.parse(data || '[]');
}

// write notes to file
function writeNotes(notes) {
fs.writeFileSync(FILE_PATH, JSON.stringify(notes, null, 2));
}

//Create your notes
app.post('/api/notes', (req, res) => {
const { title, content } = req.body;
if (!title || !content) {
return res.status(400).json({ message: 'Title and content are required' });
}

const notes = readNotes();
const newNote = {
id: Date.now().toString(),
title,
content,
createdAt: new Date().toISOString()
};

notes.push(newNote);
writeNotes(notes);
res.status(201).json(newNote);
});

//View all
app.get('/api/notes', (req, res) => {
const notes = readNotes();
res.json(notes);
});

// View one
app.get('/api/notes/:id', (req, res) => {
const notes = readNotes();
const note = notes.find(n => n.id === req.params.id);
if (!note) return res.status(404).json({ message: 'Note not found' });
res.json(note);
});

//Edit one
app.put('/api/notes/:id', (req, res) => {
const { title, content } = req.body;
const notes = readNotes();
const index = notes.findIndex(n => n.id === req.params.id);
if (index === -1) return res.status(404).json({ message: 'Note not found' });

notes[index] = { ...notes[index], title: title || notes[index].title, content: content || notes[index].content };
writeNotes(notes);
res.json(notes[index]);
});

// Delete your notes
app.delete('/api/notes/:id', (req, res) => {
const notes = readNotes();
const filtered = notes.filter(n => n.id !== req.params.id);
if (filtered.length === notes.length) {
return res.status(404).json({ message: 'Note not found' });
}
writeNotes(filtered);
res.json({ message: 'Note deleted successfully' });
});

app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});



