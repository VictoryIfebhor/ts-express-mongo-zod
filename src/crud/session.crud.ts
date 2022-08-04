import Session from "../models/session.model";

export const createSession = async (user: string, userAgent: string) => {
  try {
    const session = await Session.create({ user, userAgent });
    return session.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
};
