import { DocumentDefinition } from "mongoose";
import User, { UserInterface } from "../models/user.model";

export const createUser = async (
  input: DocumentDefinition<
    Omit<UserInterface, "createdAt" | "updatedAt" | "comparePassword">
  >
) => {
  try {
    return await User.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};
