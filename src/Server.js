import express from "express";
import Logger from "./util/Logger.js";

const app = express();
const port = process.env.PORT;
const appName = process.env.APP_NAME;

app.listen(port, () => {
  Logger.out([`${appName} is listening on port ${port}`]);
});

export { app };
