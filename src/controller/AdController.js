import axios from "axios";
import URL from "../config/url.js";
import Logger from "../util/Logger.js";
import { createSignature, toQueryString } from "../util/Hash.js";

const API_KEY = process.env.BINANCE_API_KEY;
const SECRET_KEY = process.env.BINANCE_SECRET_KEY;

const AdController = {
  searchAds: (req, res) => {
    let endpoint = "/ads/search";

    if (
      !req.query.asset ||
      !req.query.fiat ||
      !req.query.trade_type ||
      !req.query.trans_amount
    ) {
      res.json({
        required: ["asset", "fiat", "trade_type", "trans_amount"],
      });
      return;
    }

    let data = {
      asset: req.query.asset,
      fiat: req.query.fiat,
      page: 1,
      rows: 10, // This value should be less than 20
      tradeType: req.query.trade_type,
      transAmount: req.query.trans_amount,
      timestamp: Date.now(),
    };

    data.signature = createSignature(SECRET_KEY, toQueryString(data));

    axios({
      method: "POST",
      baseURL: URL.binance(),
      url: `${endpoint}?${toQueryString(data)}`,
      headers: { "X-MBX-APIKEY": API_KEY },
      data: data,
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

export default AdController;
