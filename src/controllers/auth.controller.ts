import { Request, Response } from 'express';
import { createUser, getAllUsers, checkPassword } from '../services/user.services';
import jwt from 'jsonwebtoken';

// POST /api/auth/register
export async function register(req: Request, res: Response) {
try {
const { username, email, password } = req.body;

if (!username || !email || !password) {
return res.status(400).json({ message: 'Please provide username, email and password' });
}

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
return res.status(401).json({ message: 'Invalid email or password' });
}

const isCorrect = await checkPassword(password, user.password);

if (!isCorrect) {
return res.status(401).json({ message: 'Invalid email or password' });
}

res.json({ message: 'Login successful', username: user.username });

// CREATE JWT TOKEN
const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' }
)



}



