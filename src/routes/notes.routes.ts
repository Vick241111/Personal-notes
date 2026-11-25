import { Router } from 'express';
import { getNotes, createNote, deleteNote } from '../controllers/notes.controllers';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', protect, getNotes);
router.post('/', protect, createNote);
router.delete('/:id', protect, authorize("admin"), deleteNote);

export default router;