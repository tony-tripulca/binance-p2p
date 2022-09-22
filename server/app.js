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

function createSignature(data) {
  return crypto
    .createHmac("sha256", SECRET_KEY)
    .update(data)
    .digest("hex");
}

function objectToQuerystring(data) {
  return Object.keys(data)
    .map((key) => key + "=" + data[key])
    .join("&");
}

axios.interceptors.request.use((config) => {
  config.headers.common["X-MBX-APIKEY"] = ACCESS_KEY;
  return config;
});

app.get("/", function (req, res) {
  res.json({ msg: "nothing here" });
});

app.get("/trade-history", async function (req, res) {
  let data = {
    tradeType: req.query.trade_type || "SELL",
    timestamp: Date.now(),
  };

  let signature = createSignature(objectToQuerystring(data));

  data.signature = signature;

  let result = await axios
    .get(
      `${BASE_URL}/sapi/v1/c2c/orderMatch/listUserOrderHistory?${objectToQuerystring(
        data
      )}`
    )
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });

  res.json(result);
});

app.get("/search-ads", async function (req, res) {
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

  let signature = createSignature(objectToQuerystring(data));

  data.signature = signature;

  let result = await axios
    .post(
      `${BASE_URL}/sapi/v1/c2c/ads/search?${objectToQuerystring(data)}`,
      data
    )
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });

  res.json(result);
});

app.get("/order-detail", async function (req, res) {
  let data = {
    adOrderNo: req.query.adOrderNo,
    timestamp: Date.now(),
  };

  let signature = createSignature(objectToQuerystring(data));

  data.signature = signature;

  let result = await axios
    .post(
      `${BASE_URL}/sapi/v1/c2c/orderMatch/getUserOrderDetail?${objectToQuerystring(
        data
      )}`,
      data
    )
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });

  res.json(result);
});
