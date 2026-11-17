import express from "express"
import { createNote, viewAllNotes, viewOneNote, editNote, deleteNote } from "./controller/notes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

//Create your notes
app.post('/my-notes/notes', createNote);
//view all notes
app.get('/api/notes', viewAllNotes)

// View one
app.get('/api/notes/:id', viewOneNote);

//Edit one
app.put('/api/notes/:id', editNote);

// Delete your notes
app.delete('/api/notes/:id', deleteNote);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



