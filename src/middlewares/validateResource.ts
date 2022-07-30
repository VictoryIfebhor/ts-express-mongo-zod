import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export default (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (errors: any) {
      return res.status(400).json({ error: errors.errors });
    }
  };
};
