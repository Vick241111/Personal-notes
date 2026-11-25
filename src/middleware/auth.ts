import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Checks the ticket if user is logged in
export const protect = (req: Request, res: Response, next: NextFunction) => {
const authHeader = req.headers.authorization;
const token = authHeader?.split(" ")[1]; // "Bearer <token>"

if (!token) {
return res.status(401).json({ message: "Not authorized, no token" });
}

try {
const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };
(req as any).user = decoded; // save user to req, so controllers can use req.user.id
next();
} catch (error) {
return res.status(401).json({ message: "Token is not valid" });
}
};

// Check if user is admin
export const authorize = (...roles: string[]) => {
return (req: Request, res: Response, next: NextFunction) => {
const user = (req as any).user;
if (!user || !roles.includes(user.role)) {
return res.status(403).json({ message: "Only admins can do this" });
}
next();
};
};
