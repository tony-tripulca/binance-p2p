import AxiosLogger from "axios-logger";
import axios, { AxiosInstance } from "axios";
import invariant from "tiny-invariant";

import { createSignature, objectToQuerystring } from "./utils";
import { ORDER_TYPES } from "./constants";
import { URLS } from "./urls";

export class BinanceP2P {
  baseUrl?: string;
  accessKey: string;
  secretKey: string;
  http: AxiosInstance;

  constructor(config: BinanceP2PConfig) {
    this.baseUrl = config.baseUrl || URLS.BASE_URL;
    this.accessKey = config.accessKey;
    this.secretKey = config.secretKey;
    this.http = axios.create({
      headers: {
        "X-MBX-APIKEY": config.accessKey,
      },
    });

    if (config.debug) {
      if (config.debug.httpRequests) {
        this.http.interceptors.request.use(
          AxiosLogger.requestLogger,
          AxiosLogger.errorLogger
        );
      }
      if (config.debug.httpResponses) {
        this.http.interceptors.response.use(
          AxiosLogger.responseLogger,
          AxiosLogger.errorLogger
        );
      }
    }
  }

  _createRequestPayload(endpoint: string, rawData: any) {
    const data = rawData;

    data.signature = createSignature(this.secretKey, objectToQuerystring(data));

    const url = `${this.baseUrl}${endpoint}?${objectToQuerystring(data)}`;

    return { url, data };
  }

  async _updateAd(params: UpdateAdParams) {
    invariant(params.adNumber, "Required field: adNumber");

    const { url, data } = this._createRequestPayload(URLS.UPDATE_ORDER, {
      advNos: [params.adNumber],
      advStatus: params.status,
      timestamp: Date.now(),
    });

    const result = await this.http
      .post(url, data)
      .then((response) => response.data);

    return result;
  }

  async fetchTradeHistory(params: FetchTradeHistoryParams) {
    const { url } = this._createRequestPayload(URLS.TRADE_HISTORY, {
      tradeType: params.tradeType || ORDER_TYPES.SELL,
      timestamp: Date.now(),
    });

    const result = await this.http.get(url).then((response) => response.data);

    return result;
  }

  async performP2PAdsSearch(params: PerformP2PAdsSearchParams) {
    const { url, data } = this._createRequestPayload(URLS.ADS_SEARCH, {
      asset: params.asset,
      fiat: params.fiat,
      page: 1,
      publisherType: null,
      rows: 20, // This value should be less than 20
      tradeType: params.tradeType || ORDER_TYPES.SELL,
      transAmount: params.transAmount || 100,
      timestamp: Date.now(),
    });

    const result = await this.http
      .post(url, data)
      .then((response) => response.data);

    return result;
  }

  async fetchOrderDetail(orderNumber: number) {
    const { url, data } = this._createRequestPayload(URLS.ORDER_DETAIL, {
      adOrderNo: orderNumber,
      timestamp: Date.now(),
    });

    const result = await this.http
      .post(url, data)
      .then((response) => response.data);

    return result;
  }

  async fetchOrderChatMessages(params: FetchOrderChatMessagesParams) {
    invariant(params.orderNumber, "Required field: orderNumber");

    const { url } = this._createRequestPayload(URLS.ORDER_CHAT_MESSAGES, {
      orderNo: params.orderNumber || "",
      page: params.page || 1,
      rows: params.rows || 10,
      timestamp: Date.now(),
    });

    const result = await this.http.get(url).then((response) => response.data);

    return result;
  }

  // publishes the ad
  async startAd(adNumber: number) {
    return this._updateAd({ adNumber, status: 1 });
  }

  // marks the ad as offline
  async stopAd(adNumber: number) {
    return this._updateAd({ adNumber, status: 3 });
  }

  async releaseOrderFunds(params: ReleaseOrderFundsParams) {
    const { url, data } = this._createRequestPayload(URLS.RELEASE_ORDER_FUNDS, {
      authType: params.authType,
      code: params.code,
      confirmPaidType: params.confirmPaidType,
      emailVerifyCode: params.emailVerifyCode,
      googleVerifyCode: params.googleVerifyCode,
      mobileVerifyCode: params.mobileVerifyCode,
      orderNumber: params.orderNumber,
      payId: params.payId,
      yubikeyVerifyCode: params.yubikeyVerifyCode,
      timestamp: Date.now(),
    });

    return this.http.post(url, data).then((response) => response.data);
  }

  // TODO: delete ad (so funds are available again)
}
