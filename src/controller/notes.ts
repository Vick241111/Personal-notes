import type { Request, Response } from 'express';
import type { Notes } from "../utitlities/readWriteFileHelper.js";
import { readNotes, writeNotes } from "../utitlities/readWriteFileHelper.js";

export const createNote = (req: Request, res: Response) => {
    //destructire the object to get the title and content from the request body
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    const notes: Notes[] = readNotes();

    console.log('Current notes:', notes); // Log the current notes for debugging

    const newNote: Notes = {
        id: Date.now().toString(),
        title,
        content,
        createdAt: new Date().toISOString()
    };

    notes.push(newNote);
    writeNotes(notes);
    res.status(201).json(newNote);
};

//View all
export const viewAllNotes = (req: Request, res: Response) => {
    console.log("req", req)
    const notes = readNotes();
    res.json({
        message: 'Notes retrieved successfully',
        data: notes
    });
}


export const viewOneNote = (req: Request, res: Response) => {
    console.log("req.params value", req.params.id)


    const notes = readNotes();
    console.log("notes", notes)
    const note = notes.find((n: Notes) => n.id === req.params.id);
    console.log("returned ", note)
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
}


export const editNote = (req: Request, res: Response) => {
    console.log("req.params value", req.params.id)


    const notes = readNotes();
    console.log("notes", notes)
    const note = notes.find((n: Notes) => n.id === req.params.id);
    console.log("returned ", note)
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
}

export const deleteNote = (req: Request, res: Response) => {
    const notes: Notes[] = readNotes();
    const filtered = notes.filter((n: Notes) => n.id !== req.params.id);
    if (filtered.length === notes.length) {
        return res.status(404).json({ message: 'Note not found' });
    }
    writeNotes(filtered);
    res.json({ message: 'Note deleted successfully' });
}