import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import notesRoutes from './routes/notes.routes';
import authRoutes from './routes/auth.routes';


const app = express();

app.use(helmet()); // Add security headers to the responses

app.use(cors({
    origin: 'http://localhost:3000', // Only allow frontend requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests
    message: 'Too many requests, please try again later.'
});
app.use(limiter);
app.use(express.json());
app.use('/api/notes', notesRoutes);
app.use('/api/auth', authRoutes);

export default app;