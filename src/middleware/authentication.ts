import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret = process.env.JWT_KEY!;

export function authenticateToken(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers['authorization'];
  

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    let decoded: { id: string, email: string };

    try {
        decoded = jwt.verify(token, secret) as { id: string, email: string };
    } catch {
        return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = {
        id: decoded.id,
        email: decoded.email
    
    };

    next();


}