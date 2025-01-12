import { z } from "zod";

//* auth schema
export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required." }).email(),
  password: z.string().min(1, { message: "Password is required." }),
});

export const registerSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required." }),
    email: z.string().min(1, { message: "Email is required." }).email(),
    password: z.string().min(1, { message: "Password is required." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required." }),
  })
  .refine((formObj) => formObj.password === formObj.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

//* types
export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
