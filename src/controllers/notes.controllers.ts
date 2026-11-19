import { Request, Response } from 'express';
import { getAllNotes, saveNotes, Note } from '../services/notes.services';

export function getNotes(req: Request, res: Response) {
const notes = getAllNotes();
res.json(notes);
}

export function createNote(req: Request, res: Response) {
const notes = getAllNotes();
const newNote: Note = {
id: Date.now().toString(),
title: req.body.title,
content: req.body.content
};
notes.push(newNote);
saveNotes(notes);
res.status(201).json(newNote);
}



