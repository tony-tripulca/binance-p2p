import { app } from "./Server.js";

import axios from "axios";
import URL from "./config/url.js";
import Logger from "./util/Logger.js";

function AppRoutes() {
  app.get("/", (req, res) => {
    res.json({ service: "Binance service API" });
  });
}

AppRoutes();
