class URL {
  static binance() {
    let env = process.env.APP_ENV;

    /** Change the links respective to environments */
    if (env === "dev") {
      return "https://api.binance.com/sapi/v1/c2c/";
    } else if (env === "uat") {
      return "https://api.binance.com/sapi/v1/c2c/";
    } else if (env === "prod") {
      return "https://api.binance.com/sapi/v1/c2c/";
    }

    return "https://api.binance.com/sapi/v1/c2c/";
  }
}

export default URL;
