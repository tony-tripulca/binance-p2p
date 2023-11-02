import axios from "axios";
import URL from "../config/url.js";
import Logger from "../util/Logger.js";
import { createSignature, toQueryString } from "../util/Hash.js";

const API_KEY = process.env.BINANCE_API_KEY;
const SECRET_KEY = process.env.BINANCE_SECRET_KEY;

const OrderController = {
  orderHistory: (req, res) => {
    let endpoint = "orderMatch/listUserOrderHistory";

    let data = {
      tradeType: req.query.trade_type || "SELL",
      timestamp: Date.now(),
    };

    data.signature = createSignature(SECRET_KEY, toQueryString(data));

    axios({
      method: "GET",
      baseURL: URL.binance(),
      url: `${endpoint}?${toQueryString(data)}`,
      headers: { "X-MBX-APIKEY": API_KEY },
    })
      .then((response) => {
        Logger.out([response.data]);
        res.json(response.data);
      })
      .catch((error) => {
        Logger.error([error]);
        res.json(error);
      });
  },
};

export default OrderController;
