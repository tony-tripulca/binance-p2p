import axios from "axios";
import URL from "../config/url.js";
import Logger from "../util/Logger.js";
import { createSignature, toQueryString } from "../util/Hash.js";

const API_KEY = process.env.BINANCE_API_KEY;
const SECRET_KEY = process.env.BINANCE_SECRET_KEY;

const ChatController = {
  getByOrderId: (req, res) => {
    let endpoint = "/chat/retrieveChatMessagesWithPagination";

    if (!req.query.order_id) {
      res.json({ validation: ["order_id is required"] });
      return;
    }

    let data = {
      orderNo: req.query.order_id,
      page: req.query.page || 1,
      rows: req.query.rows || 10,
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
        Logger.out([response]);
        res.json(response.data);
      })
      .catch((error) => {
        Logger.error([error]);
        res.json(error.response.data);
      });
  },
};

export default ChatController;
