import * as z from "zod";

export const loginSchemas = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" }),
});

