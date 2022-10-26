const express = require("express");
const { p2p } = require("./binance-p2p-instance");

const router = express.Router();

// TODO: generate automatic api docs w/ something like swagger?

router.get("/trade-history", async function (req, res) {
  const result = await p2p.fetchTradeHistory({
    tradeType: req.query.trade_type,
  });

  res.json(result);
});

router.get("/search-ads", async function (req, res) {
  const result = await p2p.performP2PAdsSearch({
    asset: req.query.asset,
    fiat: req.query.fiat,
    tradeType: req.query.trade_type,
    transAmount: req.query.trans_amount,
  });

  res.json(result);
});

router.get("/order-detail", async function (req, res) {
  const result = await p2p.fetchOrderDetail(req.query.adOrderNo);

  res.json(result);
});

router.get("/get-chats", async function (req, res) {
  const result = await p2p.fetchOrderChatMessages({
    orderNumber: req.query.order_no,
    page: req.query.page,
    rows: req.query.rows,
  });

  res.json(result);
});

module.exports = router;
