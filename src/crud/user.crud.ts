import { DocumentDefinition } from "mongoose";
import { omit } from "lodash";
import User, { UserInterface } from "../models/user.model";

export const createUser = async (
  input: DocumentDefinition<
    Omit<
      UserInterface,
      | "createdAt"
      | "updatedAt"
      | "comparePassword"
      | "generateAccessToken"
      | "generateRefreshToken"
    >
  >
) => {
  const user = await User.create(input);
  return omit(user.toJSON(), "password");
};

export const validateCredentials = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Credentials");
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    throw new Error("Invalid Credentials");
  }
  return omit(user.toJSON(), "password");
};
