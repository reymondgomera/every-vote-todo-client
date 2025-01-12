import { z } from "zod";

export const paramsSchema = z.object({
  uuid: z.string().min(1, { message: "Id is required." }),
});
