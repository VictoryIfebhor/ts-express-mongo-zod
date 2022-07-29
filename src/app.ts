import "dotenv/config";
import express from "express";
import connectDB from "./utils/connect";
import logger from "./utils/logger";

const app = express();

const port = process.env.PORT;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () =>
      logger.info(`App running at http://localhost:${port}`)
    );
  } catch (error) {
    logger.error("Could not connect to db");
  }
};

start();
