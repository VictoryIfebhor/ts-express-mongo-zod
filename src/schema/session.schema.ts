import { object, string } from "zod";

export const createSessionSchema = object({
  body: object({
    email: string({ required_error: "Email is required" })
      .email("Not a valid email")
      .min(1, "Email is required"),
    password: string({ required_error: "Password is required" }).min(
      1,
      "Password is required"
    ),
  }),
});
