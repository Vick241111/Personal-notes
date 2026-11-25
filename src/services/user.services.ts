import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export interface User {
id: string;
username: string;
email: string;
password: string; // It will store the HASHED password, not the real one
role: "user" | "admin"; 
}

const filePath = path.join(__dirname, '../../users.json');

export function getAllUsers(): User[] {
const data = fs.readFileSync(filePath, 'utf-8');
return JSON.parse(data);
}

export function saveUsers(users: User[]) {
fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

// Hashes the password
export async function createUser(username: string, email: string, plainPassword: string): Promise<User> {
const users = getAllUsers();

// Check if user already exists
const existingUser = users.find(u => u.email === email);
if (existingUser) {
throw new Error('User already exists');
}

// Hash the password - 10 is the strength. 10 is good.
const hashedPassword = await bcrypt.hash(plainPassword, 10);

// Create the new user with the hashed password
const newUser: User = {
id: Date.now().toString(),
username,
email,
password: hashedPassword,
role: "user"
};

users.push(newUser);
saveUsers(users);
return newUser;
}

// This is for login - to check if password is correct
export async function checkPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
return await bcrypt.compare(plainPassword, hashedPassword);
}
