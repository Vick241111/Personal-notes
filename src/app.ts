import 'dotenv/config'
import express from 'express';
import notesRoutes from './routes/notes.routes';
import authRoutes from './routes/auth.routes';
const app = express();
app.use(express.json());
app.use('/api/notes', notesRoutes);
app.use('/api/auth', authRoutes);

export default app;