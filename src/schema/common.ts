import { z } from "zod";

//* common schema
export const paramsSchema = z.object({
  uuid: z.string().min(1, { message: "Id is required." }),
});
