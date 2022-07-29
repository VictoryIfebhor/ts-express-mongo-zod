import pino from "pino";
import dayjs from "dayjs";
import pretty from "pino-pretty";

pretty({});

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

export default logger;
