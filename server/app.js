const express = require("express");
const app = express();
const axios = require("axios");
const crypto = require("crypto");

require("dotenv").config();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "*");

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", false);

  // Pass to next layer of middleware
  next();
});

let port = 8080;

app.listen(port, function () {
  console.log(`Binance test app listening on port ${port}!`);
});

const BASE_URL = process.env.BASE_URL;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

/*
 * Function to generate Binance required signature
 */
function createSignature(data) {
  return crypto.createHmac("sha256", SECRET_KEY).update(data).digest("hex");
}

/*
 * Function to convert object to query string
 */
function objectToQuerystring(data) {
  return Object.keys(data)
    .map((key) => key + "=" + data[key])
    .join("&");
}

/*
 * Intercept request with Binance access key
 */
axios.interceptors.request.use((config) => {
  config.headers.common["X-MBX-APIKEY"] = ACCESS_KEY;
  return config;
});

app.get("/", function (req, res) {
  res.json({ msg: "nothing here" });
});

app.get("/trade-history", async function (req, res) {
  let endpoint = "/sapi/v1/c2c/orderMatch/listUserOrderHistory";

  let data = {
    tradeType: req.query.trade_type || "SELL",
    timestamp: Date.now(),
  };

  data.signature = createSignature(objectToQuerystring(data));

  let url = `${BASE_URL}${endpoint}?${objectToQuerystring(data)}`;

  let result = await axios
    .get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });

  res.json(result);
});

app.get("/search-ads", async function (req, res) {
  let endpoint = "/sapi/v1/c2c/ads/search";

  let data = {
    asset: req.query.asset || "USDT",
    fiat: req.query.fiat || "PHP",
    page: 1,
    publisherType: null,
    rows: 20, // This value should be less than 20
    tradeType: req.query.trade_type || "SELL",
    transAmount: req.query.trans_amount || 100,
    timestamp: Date.now(),
  };

  data.signature = createSignature(objectToQuerystring(data));

  let url = `${BASE_URL}${endpoint}?${objectToQuerystring(data)}`;

  let result = await axios
    .post(url, data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });

  res.json(result);
});

app.get("/order-detail", async function (req, res) {
  let endpoint = "/sapi/v1/c2c/orderMatch/getUserOrderDetail";

  let data = {
    adOrderNo: req.query.adOrderNo,
    timestamp: Date.now(),
  };

  data.signature = createSignature(objectToQuerystring(data));

  let url = `${BASE_URL}${endpoint}?${objectToQuerystring(data)}`;

  let result = await axios
    .post(url, data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });

  res.json(result);
});

app.get("/get-chats", async function (req, res) {
  let endpoint = "/sapi/v1/c2c/chat/retrieveChatMessagesWithPagination";

  if (!req.query.order_no) {
    res.json({ err: "Required field(s): order_no" });
  }

  let data = {
    orderNo: req.query.order_no || "",
    page: req.query.page || 1,
    rows: req.query.rows || 10,
    timestamp: Date.now(),
  };

  data.signature = createSignature(objectToQuerystring(data));

  let url = `${BASE_URL}${endpoint}?${objectToQuerystring(data)}`;

  let result = await axios
    .get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });

  res.json(result);
});
