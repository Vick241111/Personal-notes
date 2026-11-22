import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { signupSchema, loginSchema } from '../validation/notes.validation';

const router = Router();


router.post("/register",
validate(signupSchema), register);
router.post("/login",
validate(loginSchema), login);



export default router;
