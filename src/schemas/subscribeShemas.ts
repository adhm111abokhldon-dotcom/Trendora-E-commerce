import * as z from "zod";

const subscribeShemas = z.object({
  email: z.email().min(1, { message: "Invalid Email" }),
});

export default subscribeShemas;
