import { Request, Response } from "express";
import { omit } from "lodash";
import logger from "../utils/logger";
import { CreateUserType } from "../schema/user.schema";
import { createUser } from "../crud/user.crud";

export const signUp = async (
  req: Request<{}, {}, CreateUserType["body"]>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ user: omit(user.toJSON(), "password") });
  } catch (errors: any) {
    logger.error(errors);
    return res.status(400).json({ msg: errors.message });
  }
};
