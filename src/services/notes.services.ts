import fs from 'fs';
import path from 'path';

export interface Note {
id: string;
title: string;
content: string;
userId: string; 
}

const filePath = path.join(__dirname, '../../notes.json');

export function getAllNotes(): Note[] {
const data = fs.readFileSync(filePath, 'utf-8');
return JSON.parse(data);
}

export function saveNotes(notes: Note[]) {
fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}



