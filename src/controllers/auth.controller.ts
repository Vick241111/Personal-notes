import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { createUser, getAllUsers, checkPassword } from '../services/user.services';

const secret = process.env.JWT_KEY!
const expiresIn = process.env.JWT_EXPIRES_IN! || "1h"


// POST /api/auth/register
export async function register(req: Request, res: Response) {
    try {
        const { username, email, password } = req.body;
        console.log("email", email)


        const newUser = await createUser(username, email, password);

        // Don't send the password back to the user, even if it's hashed
        res.status(201).json({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            message: 'User created successfully'
        });

    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

// POST /api/auth/login
export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    const users = getAllUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(401).json({ message: 'Email not found' });
    }

    const isCorrect = await bcrypt.compare(password, user.password);


    if (!isCorrect) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({
        id: user.id,
        email: user.email

    }, secret, { expiresIn: '7d' });


    res.json({
        message: 'Login successful',
        userToken: token
    });
}



