import axios from "axios";
import URL from "../config/url.js";
import { createSignature, toQueryString } from "../util/Hash.js";

const API_KEY = process.env.BINANCE_API_KEY;
const SECRET_KEY = process.env.BINANCE_SECRET_KEY;

const BinanceService = {
  orderHistory: (payload) => {
    let endpoint = "orderMatch/listUserOrderHistory";
    payload.signature = createSignature(SECRET_KEY, toQueryString(payload));

    return axios({
      method: "GET",
      baseURL: URL.binance(),
      url: `${endpoint}?${toQueryString(payload)}`,
      headers: { "X-MBX-APIKEY": API_KEY },
    });
  },
  orderDetails: (payload) => {
    let endpoint = "/orderMatch/getUserOrderDetail";
    payload.signature = createSignature(SECRET_KEY, toQueryString(payload));

    return axios({
      method: "POST",
      baseURL: URL.binance(),
      url: `${endpoint}?${toQueryString(payload)}`,
      headers: { "X-MBX-APIKEY": API_KEY },
      data: payload,
    });
  },
  orderChats: (payload) => {
    let endpoint = "/chat/retrieveChatMessagesWithPagination";
    payload.signature = createSignature(SECRET_KEY, toQueryString(payload));

    return axios({
      method: "GET",
      baseURL: URL.binance(),
      url: `${endpoint}?${toQueryString(payload)}`,
      headers: { "X-MBX-APIKEY": API_KEY },
    });
  },
  placeOrderCheck: (payload) => {
    let endpoint = "/orderMatch/checkIfCanPlaceOrder";
    payload.signature = createSignature(SECRET_KEY, toQueryString(payload));

    return axios({
      method: "POST",
      baseURL: URL.binance(),
      url: `${endpoint}?${toQueryString(payload)}`,
      headers: { "X-MBX-APIKEY": API_KEY },
      data: payload,
    });
  },
  placeOrder: (payload) => {
    let endpoint = "/orderMatch/placeOrder";
    payload.signature = createSignature(SECRET_KEY, toQueryString(payload));

    return axios({
      method: "POST",
      baseURL: URL.binance(),
      url: `${endpoint}?${toQueryString(payload)}`,
      headers: { "X-MBX-APIKEY": API_KEY },
      data: payload,
    });
  },
  adsSearch: (payload) => {
    let endpoint = "/ads/search";
    payload.signature = createSignature(SECRET_KEY, toQueryString(payload));

    return axios({
      method: "POST",
      baseURL: URL.binance(),
      url: `${endpoint}?${toQueryString(payload)}`,
      headers: { "X-MBX-APIKEY": API_KEY },
      data: payload,
    });
  },
};

export default BinanceService;
