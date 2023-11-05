module.exports = {
  apps: [
    {
      name: "BinanceService",
      namespace: "binance-p2p",
      script: "./src/index.js",
      watch: ["./src", "./src/*.js"],
      output: "./logs/out.log",
      error: "./logs/error.log",
    },
  ],
};
