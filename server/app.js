const express = require("express");
const binanceP2PEndpoints = require("./binance-p2p-endpoints.js");

const app = express();
const port = 8080;

app.use((req, res, next) => {
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

// TODO: add frontend UI to interact with these endpoints

app.get("/", function (req, res) {
  res.json({ msg: "nothing here" });
});

app.use("/p2p", binanceP2PEndpoints);

app.listen(port, () => {
  console.log(`Binance test app listening on port ${port}!`);
});
