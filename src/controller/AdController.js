import axios from "axios";
import URL from "../config/url.js";
import Logger from "../util/Logger.js";
import BinanceService from "../services/BinanceService.js";

const AdController = {
  adsSearch: (req, res) => {
    if (!req.query.asset || !req.query.fiat || !req.query.trade_type) {
      res.json({
        required: ["asset", "fiat", "trade_type"],
      });
      return;
    }

    BinanceService.adsSearch({
      asset: req.query.asset,
      fiat: req.query.fiat,
      page: 1,
      rows: 15, // This value should be less than 20
      tradeType: req.query.trade_type,
      transAmount: req.query.trans_amount,
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

export default AdController;
