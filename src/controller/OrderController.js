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
        Logger.out([response]);
        res.json(response.data);
      })
      .catch((error) => {
        Logger.error([error]);
        res.json(error.response.data);
      });
  },
  orderDetails: (req, res) => {
    let endpoint = "/orderMatch/getUserOrderDetail";

    if (!req.query.order_id) {
      res.json({ validation: ["order_id is required"] });
      return;
    }

    let data = {
      adOrderNo: req.query.order_id,
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
  canPlaceOrder: (req, res) => {
    let endpoint = "/orderMatch/checkIfCanPlaceOrder";

    if (!req.query.ad_no) {
      res.json({ required: ["ad_no"] });
      return;
    }

    let data = {
      adOrderNo: req.query.ad_no,
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
  placeOrder: (req, res) => {
    let endpoint = "/orderMatch/placeOrder";

    if (
      !req.query.ad_no ||
      !req.query.asset ||
      !req.query.fiat_unit ||
      !req.query.trade_type ||
      !req.query.amount ||
      !req.query.match_price
    ) {
      res.json({
        required: [
          "ad_no",
          "asset",
          "fiat_unit",
          "trade_type",
          "amount",
          "match_price",
        ],
      });
      return;
    }

    /**
     * Sample from binance
     *
     * advOrderNumber:"11545671396146724864"
     * area: "p2pZone"
     * asset: "USDT"
     * buyType: "BY_MONEY"
     * channel: "c2c"
     * fiatUnit: "PHP"
     * matchPrice: "57.67"
     * origin: "MAKE_TAKE"
     * totalAmount: "500"
     * tradeType:"BUY"
     *
     * http://localhost:8080/place-order?asset=USDT&fiat_unit=PHP&trade_type=BUY&amount=500&ad_no=11503990198520131584&match_price=57.65
     *
     */

    let data = {
      advOrderNumber: req.query.ad_no,
      area: "p2pZone",
      asset: req.query.asset,
      buyType: "BY_MONEY",
      channel: "c2c",
      fiatUnit: req.query.fiat_unit,
      matchPrice: req.query.match_price,
      totalAmount: req.query.amount,
      origin: "MAKE_TAKE",
      tradeType: req.query.trade_type,
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

export default OrderController;
