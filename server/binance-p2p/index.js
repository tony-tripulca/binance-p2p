const AxiosLogger = require("axios-logger");
const axios = require("axios");
const invariant = require("tiny-invariant");

const { createSignature, objectToQuerystring } = require("./utils");
const { ORDER_TYPES } = require("./constants");
const { URLS } = require("./urls");

class BinanceP2P {
  constructor(config) {
    this.baseUrl = config.baseUrl || URLS.BASE_URL;
    this.accessKey = config.accessKey;
    this.secretKey = config.secretKey;
    this.http = axios.create({
      headers: {
        "X-MBX-APIKEY": config.accessKey,
      },
    });

    if (config.debug) {
      this.http.interceptors.request.use(
        AxiosLogger.requestLogger,
        AxiosLogger.errorLogger
      );
      if (config.debugResponses) {
        this.http.interceptors.response.use(
          AxiosLogger.responseLogger,
          AxiosLogger.errorLogger
        );
      }
    }
  }

  _createRequestPayload(endpoint, rawData) {
    const data = rawData;

    data.signature = createSignature(this.secretKey, objectToQuerystring(data));

    const url = `${this.baseUrl}${endpoint}?${objectToQuerystring(data)}`;

    return { url, data };
  }

  async fetchTradeHistory({ tradeType }) {
    const { url } = this._createRequestPayload(URLS.TRADE_HISTORY, {
      tradeType: tradeType || ORDER_TYPES.SELL,
      timestamp: Date.now(),
    });

    const result = await this.http.get(url).then((response) => response.data);

    return result;
  }

  async performP2PAdsSearch(params) {
    const { url, data } = this._createRequestPayload(URLS.ADS_SEARCH, {
      asset: params.asset,
      fiat: params.fiat,
      page: 1,
      publisherType: null,
      rows: 20, // This value should be less than 20
      tradeType: params.trade_type || ORDER_TYPES.SELL,
      transAmount: params.trans_amount || 100,
      timestamp: Date.now(),
    });

    const result = await this.http
      .post(url, data)
      .then((response) => response.data);

    return result;
  }

  async fetchOrderDetail(orderNumber) {
    const { url, data } = this._createRequestPayload(URLS.ORDER_DETAIL, {
      adOrderNo: orderNumber,
      timestamp: Date.now(),
    });

    const result = await this.http
      .post(url, data)
      .then((response) => response.data);

    return result;
  }

  async fetchOrderChatMessages({ orderNumber, page, rows }) {
    invariant(orderNumber, "Required field: orderNumber");

    const { url } = this._createRequestPayload(URLS.ORDER_CHAT_MESSAGES, {
      orderNo: orderNumber || "",
      page: page || 1,
      rows: rows || 10,
      timestamp: Date.now(),
    });

    const result = await this.http.get(url).then((response) => response.data);

    return result;
  }

  // publishes the ad
  async startAd(adNumber) {
    return this.updateAd({ adNumber, status: 1 });
  }

  // marks the ad as offline
  async stopAd(adNumber) {
    return this.updateAd({ adNumber, status: 3 });
  }

  // TODO: delete ad (so funds are available again)

  async updateAd({ adNumber, status }) {
    invariant(adNumber, "Required field: adNumber");

    const { url, data } = this._createRequestPayload(URLS.UPDATE_ORDER, {
      advNos: [adNumber],
      advStatus: status,
      timestamp: Date.now(),
    });

    const result = await this.http
      .post(url, data)
      .then((response) => response.data);

    return result;
  }
}

module.exports = { BinanceP2P };
