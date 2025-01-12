import { z } from "zod";

//* todo schema
export const todoSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  status: z.boolean().default(false),
  dueDate: z.date().nullish(),
});

//* types
export type TodoForm = z.infer<typeof todoSchema>;
