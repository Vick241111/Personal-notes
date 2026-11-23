import { Router } from 'express';
import {validate} from "../middleware/validation";
import { authenticateToken } from '../middleware/authentication';
import { createNoteValidationSchema } from '../validations/notes.validation';
import { getNotes, createNote } from '../controllers/notes.controllers';

const router = Router();

router.get('/', authenticateToken, getNotes);
router.post('/', validate(createNoteValidationSchema), createNote);

export default router;