import axios from "axios";
import URL from "../config/url.js";
import Logger from "../util/Logger.js";

import BinanceService from "../services/BinanceService.js";

const ChatController = {
  orderChats: (req, res) => {
    if (!req.params.order_id) {
      res.json({ required: ["order_id"] });
      return;
    }

    BinanceService.orderChats({
      orderNo: req.params.order_id,
      page: req.query.page || 1,
      rows: req.query.rows || 10,
      timestamp: Date.now(),
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
