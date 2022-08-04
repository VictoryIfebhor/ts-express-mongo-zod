import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }).min(
      1,
      "Name is required"
    ),
    password: string({ required_error: "Password is required" }).min(
      8,
      "Password too short - Must be at least 8 characters"
    ),
    confirmPassword: string({ required_error: "ConfirmPassword is required" }),
    email: string({ required_error: "Email is required" }).email(
      "Not a valid email"
    ),
  }).refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    { message: "Passwords do not match", path: ["confirmPassword"] }
  ),
});

export type CreateUserType = TypeOf<typeof createUserSchema>;
