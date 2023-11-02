import { app } from "./Server.js";

import axios from "axios";
import URL from "./config/url.js";
import Logger from "./util/Logger.js";

import OrderController from "./controller/OrderController.js";

function AppRoutes() {
  app.get("/", (req, res) => {
    res.json({ service: "Binance service API" });
  });

  app.get("/orders", (req, res) => {
    OrderController.orderHistory(req, res);
  });

  app.get("/order-details", (req, res) => {
    OrderController.orderDetails(req, res);
  });
}

AppRoutes();
