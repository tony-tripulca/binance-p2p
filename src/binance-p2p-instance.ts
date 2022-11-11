import * as dotenv from "dotenv";
dotenv.config();

import { BinanceP2P } from "./binance-p2p";

export const p2p = new BinanceP2P({
  accessKey: String(process.env.ACCESS_KEY),
  secretKey: String(process.env.SECRET_KEY),
  debug: {
    httpRequests: process.env.DEBUG_REQUESTS === "true",
    httpResponses: process.env.DEBUG_RESPONSES === "true",
  },
});
