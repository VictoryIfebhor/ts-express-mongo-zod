import { Request, Response } from "express";
import { validateCredentials } from "../crud/user.crud";
import { createSession } from "../crud/session.crud";

export const createSessionController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await validateCredentials(email, password);
    const session = await createSession(user._id, req.get("user-agent") || "");
    const accessToken = user.generateAccessToken(session._id);
    const refreshToken = user.generateRefreshToken(session._id);
    res.status(200).json({ accessToken, refreshToken });
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};
