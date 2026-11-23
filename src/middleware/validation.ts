import { Request, Response, NextFunction } from "express";
import * as z from "zod";

export const validate =
  (schema: z.ZodType) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await schema.safeParseAsync(req.body);
      console.log("result:", result.error)
      if (!result.success) {
        return res.status(400).json({
          message: "Validation failed",
          errors: result.error.issues.map((issue) => ({
            path: issue.path.join("."),
            code: issue.code,
            message: issue.message,
          })),
        });
      }

      req.body = result.data;

      return next();
    };
