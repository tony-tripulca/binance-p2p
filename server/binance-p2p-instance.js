require("dotenv").config();

const { BinanceP2P } = require("./binance-p2p/index.js");

const p2p = new BinanceP2P({
  accessKey: String(process.env.ACCESS_KEY),
  secretKey: String(process.env.SECRET_KEY),
  debug: process.env.DEBUG === "true",
  debugResponses: process.env.DEBUG_RESPONSES === "true",
});

module.exports = { p2p };
