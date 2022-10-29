export {};

declare global {
  // type utils
  type KeyValuePairs<T extends string> = { [K in T]: K };

  // binance
  interface DebugBinanceP2PConfig {
    httpRequests?: boolean;
    httpResponses?: boolean;
  }

  interface BinanceP2PConfig {
    baseUrl?: string;
    accessKey: string;
    secretKey: string;
    debug?: DebugBinanceP2PConfig;
  }

  type BinanceTradeTypes = "BUY" | "SELL";

  type BinanceTradeTypesMap = KeyValuePairs<BinanceTradeTypes>;

  interface FetchOrderChatMessagesParams {
    orderNumber: number;
    page?: number;
    rows?: number;
  }

  interface PerformP2PAdsSearchParams {
    asset: string;
    fiat: string;
    tradeType?: BinanceTradeTypes;
    transAmount?: number;
  }

  interface UpdateAdParams {
    adNumber: number;
    status: number;
  }

  interface FetchTradeHistoryParams {
    tradeType: BinanceTradeTypes;
  }
}
