import { Express } from "express";
import { signUp } from "./controller/user.controller";
import { createSessionController } from "./controller/session.controller";
import validateResource from "./middlewares/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { createSessionSchema } from "./schema/session.schema";

export default (app: Express) => {
  app.get("/", (req, res) => {
    res.status(200).json({ msg: "Connected" });
  });
  app.post("/users", validateResource(createUserSchema), signUp);
  app.post(
    "/sessions",
    validateResource(createSessionSchema),
    createSessionController
  );
};
