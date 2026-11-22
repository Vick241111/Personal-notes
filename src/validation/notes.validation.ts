import { z } from "zod";

// This is for creating a note
export const createNoteSchema = z.object({
    title: z.string() .min(1, "Title is required").max(100, "Title too long"), content: z.string().min(1, "Content is required"),
});

// This is for signup
export const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// This is for login
export const loginSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password is required"),
});