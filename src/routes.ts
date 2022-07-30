import { Express } from "express";
import { signUp } from "./controller/user.controller";
import validateResource from "./middlewares/validateResource";
import { createUserSchema } from "./schema/user.schema";

export default (app: Express) => {
  app.get("/", (req, res) => {
    res.status(200).json({ msg: "Connected" });
  });
  app.post("/", validateResource(createUserSchema), signUp);
};
