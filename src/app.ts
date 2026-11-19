import express from 'express';
import notesRoutes from './routes/notes.routes';

const app = express();
app.use(express.json());
app.use('/api/notes', notesRoutes);

export default app;