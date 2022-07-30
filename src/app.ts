import "dotenv/config";
import express from "express";
import connectDB from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";

const app = express();

app.use(express.json());

const port = process.env.PORT;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () =>
      logger.info(`App running at http://localhost:${port}`)
    );
    routes(app);
  } catch (error) {
    logger.error("Could not connect to db");
  }
};

start();
