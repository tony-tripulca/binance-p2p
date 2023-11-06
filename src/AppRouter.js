import { app } from "./Server.js";

import axios from "axios";
import URL from "./config/url.js";
import Logger from "./util/Logger.js";

import OrderController from "./controller/OrderController.js";
import ChatController from "./controller/ChatController.js";
import AdController from "./controller/AdController.js";

app.get("/", (req, res) => {
  res.json({ service: process.env.APP_NAME });
});

app.get("/orders/:order_id/details", OrderController.orderDetails);
app.get("/orders/:order_id/chats", ChatController.orderChats);
app.get("/orders", OrderController.orderHistory);

app.get("/place-order/:ad_no/check", OrderController.placeOrderCheck);
app.get("/place-order", OrderController.placeOrder);

app.get("/ads/search", AdController.adsSearch);
