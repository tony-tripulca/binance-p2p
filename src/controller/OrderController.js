import axios from "axios";
import URL from "../config/url.js";
import Logger from "../util/Logger.js";
import BinanceService from "../services/BinanceService.js";

const OrderController = {
  orderHistory: (req, res) => {
    if (!req.query.trade_type) {
      res.json({ required: ["trade_type"] });
      return;
    }

    BinanceService.orderHistory({
      tradeType: req.query.trade_type,
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
  orderDetails: (req, res) => {
    if (!req.params.order_id) {
      res.json({ required: ["order_id"] });
      return;
    }

    BinanceService.orderDetails({
      adOrderNo: req.params.order_id,
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
  placeOrderCheck: (req, res) => {
    if (!req.params.ad_no) {
      res.json({ required: ["ad_no"] });
      return;
    }

    BinanceService.placeOrderCheck({
      adOrderNo: req.params.ad_no,
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
  placeOrder: (req, res) => {
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

    BinanceService.placeOrder({
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
