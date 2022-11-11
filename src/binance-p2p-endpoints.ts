import express from "express";
import invariant from "tiny-invariant";

import { ORDER_TYPES } from "./binance-p2p/constants";

import { p2p } from "./binance-p2p-instance";

const router = express.Router();

// TODO: generate automatic api docs w/ something like swagger?

router.get("/trade-history", async function (req, res) {
  const tradeType = String(req.query.trade_type);

  invariant(tradeType, "Required field: trade_type");

  if (tradeType !== ORDER_TYPES.BUY && tradeType !== ORDER_TYPES.SELL) {
    return res.json({ error: "Invalid trade_type" });
  }

  const result = await p2p.fetchTradeHistory({ tradeType });

  res.json(result);
});

router.get("/search-ads", async function (req, res) {
  const asset = String(req.query.asset);
  const fiat = String(req.query.fiat);
  const tradeType = String(req.query.trade_type);
  const transAmount = Number(req.query.trans_amount) || undefined;

  invariant(asset, "Required field: asset");
  invariant(fiat, "Required field: fiat");

  if (tradeType !== ORDER_TYPES.BUY && tradeType !== ORDER_TYPES.SELL) {
    return res.json({ error: "Invalid trade_type" });
  }

  const result = await p2p.performP2PAdsSearch({
    asset,
    fiat,
    tradeType,
    transAmount,
  });

  res.json(result);
});

router.get("/order-detail", async function (req, res) {
  const adNumber = Number(req.query.adOrderNo);

  invariant(adNumber, "Required field: adOrderNo");

  const result = await p2p.fetchOrderDetail(adNumber);

  res.json(result);
});

router.get("/get-chats", async function (req, res) {
  const orderNumber = Number(req.query.orderNumber);
  const page = Number(req.query.page) || undefined;
  const rows = Number(req.query.rows) || undefined;

  invariant(orderNumber, "Required field: adOrderNo");

  const result = await p2p.fetchOrderChatMessages({
    orderNumber,
    page,
    rows,
  });

  res.json(result);
});

export default router;
