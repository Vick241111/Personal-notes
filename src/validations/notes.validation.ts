import * as z from "zod";

export const createNoteValidationSchema = z.object({
    content: z.string().min(2, "Content is required").max(100, "Content must be at most 100 characters long"),
    title: z
        .string()
        .min(2, "Title is required")
        .max(50, "Title must be at most 50 characters long"),
})