import * as z from "zod";

export const loginShemas = z.object({
  username: z.string().refine((val) => val === "emilys", {
    message: 'username must be "emilys"',
  }),
  password: z.string().refine((val) => val === "emilyspass", {
    message: 'password must be "emilyspass"',
  }),
});
