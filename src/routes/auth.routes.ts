import { Router } from 'express';
import { registerValidationSchema, loginValidationSchema } from '../validations/auth.validation';

import { validate } from '../middleware/validation';
import { register, login } from '../controllers/auth.controller';

const router = Router();

router.post('/register', validate(registerValidationSchema), register);
router.post('/login', validate(loginValidationSchema), login);

export default router;