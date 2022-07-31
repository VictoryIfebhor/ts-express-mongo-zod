import { DocumentDefinition } from "mongoose";
import User, { UserInterface } from "../models/user.model";

export const createUser = async (
  input: DocumentDefinition<
    Omit<UserInterface, "createdAt" | "updatedAt" | "comparePassword">
  >
) => {
  try {
    const user = await User.create(input);
    return user.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
};
