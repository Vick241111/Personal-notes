import { Router } from 'express';
import { getNotes, createNote } from '../controllers/notes.controllers';

const router = Router();

router.get('/', getNotes);
router.post('/', createNote);

export default router;