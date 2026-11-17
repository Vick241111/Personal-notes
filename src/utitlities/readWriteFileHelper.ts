import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.join(__dirname, '../../notes.json');

console.log("FILE_PATH", FILE_PATH)

export interface Notes {
    id: string,
    title: string,
    content: string,
    createdAt: string,
    age?: number
}



// read notes from file
export function readNotes() {
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    return JSON.parse(data || '[]');
}


// write notes to file
export function writeNotes(notes: Notes[]) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(notes, null, 2));
}