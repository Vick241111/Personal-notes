import * as z from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const registerValidationSchema = z.object({
    username: z.string().min(3, "Username is required").max(20, "Username must be at most 20 characters long"),
    email: z.email("Invalid email format"),
    password: z
        .string()
        .regex(
            passwordRegex,
            "Password must be 6+ chars with uppercase, lowercase, number, and special character"
        ),
});

export const loginValidationSchema = z.object({
    email: z.email("Invalid email format"),
    password: z
        .string()
        .regex(
            passwordRegex,
            "Password must be 6+ chars with uppercase, lowercase, number, and special character"
        ),
})


