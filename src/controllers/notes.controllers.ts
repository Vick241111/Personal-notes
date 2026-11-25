import { Request, Response } from 'express';
import { getAllNotes, saveNotes, Note } from '../services/notes.services';

export function getNotes(req: Request, res: Response) {
const notes = getAllNotes();
const userID = (req as any).user.id;
const userNotes = notes.filter(note => note.userId === userID);
res.json(userNotes);
}

export function createNote(req: Request, res: Response) {
const notes = getAllNotes();
const userID = (req as any).user.id;
const newNote: Note = {
id: Date.now().toString(),
title: req.body.title,
content: req.body.content,
userId: userID
};
notes.push(newNote);
saveNotes(notes);
res.status(201).json(newNote);
}
export function deleteNote(req: Request, res: Response) {
    const notes = getAllNotes();
    const index = notes.findIndex((note) => note.id === req.params.id);
    if (index !== -1) {
        return res.status(404).json({ message: 'Note not found' });
    }
    notes.splice(index, 1);
    saveNotes(notes);
    res.json({ message: "Note deleted" });



}



