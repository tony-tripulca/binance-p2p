# Binance P2P API

This is written in Node.js visit [Nodejs.org](https://nodejs.org/en/).

1. npm install
2. Rename `edit-this.env` to `.env`
3. Edit the contents of `.env`
   ```
   BASE_URL=https://api.binance.com
   ACCESS_KEY=[Your Binance access key]
   SECRET_KEY=[Your Binance secret key]
   ```
4. Run node

## Making a Signed Request

On this example we can use the endpoint: `/sapi/v1/c2c/orderMatch/getUserOrderDetail`

1. Make sure you have updated the ACCESS_KEY and SECRET_KEY on `.env` file.
2. Update the parameters for this call
   ```
   let data = {
     adOrderNo: req.query.adOrderNo, // required
     timestamp: Date.now(), // timestamp is important to signed requests
   };
   ```
3. Convert the parameters (payload) into a query string

   ```
   objectToQuerystring(data);

   function objectToQuerystring(data) {
     return Object.keys(data)
       .map((key) => key + "=" + data[key])
       .join("&");
   }

   Note: You can add a URLencode method here upon parsing object to query string if needed.
   ```

4. Hash the query string in `SHA256 HMAC` format.

   ```
   createSignature(objectToQuerystring(data));

   function createSignature(data) {
     return crypto.createHmac("sha256", SECRET_KEY).update(data).digest("hex");
   }
   ```

5. Append the created signature on the parameters.
   ```
   data.signature = createSignature(objectToQuerystring(data));
   ```
6. Form the url for making a request.
   ```
   let url = `${BASE_URL}${endpoint}?${objectToQuerystring(data)}`;
   ```
7. The url should look like below but exactly as it is because of the timestamp and the signature.
   ```
   https://api.binance.com/sapi/v1/c2c/orderMatch/getUserOrderDetail?adOrderNo=204xxxxxxxxxxxxxxxxx3552&timestamp=1666789356537&signature=172dd497d08f68fbd499185deacbd98d21c9df5b73e22d3941172baad648c5bf
   ```
8. Make a post request along with the data.
   ```
   let result = await axios
     .post(url, data)
     .then(function (response) {
       return response.data;
     })
     .catch(function (error) {
       return error;
     });
   ```
9. You should get the order details of the selected AdOrderNo.

## API

### Create a P2P instance

```js
const p2p = new BinanceP2P({
  accessKey: "Your binance access key here",
  secretKey: "Your binance secret key here",
});
```

### Methods

<details>

<summary><b>fetchTradeHistory(params)</b>: Returns history of P2P trades</summary>

- Params

```
{
  tradeType: "BUY" | "SELL"
}
```

- Result

```
TODO
```

</details>

<details>

<summary><b>performP2PAdsSearch(params)</b>: Returns results from currently published P2P ads.</summary>

- Params

```
{
  asset: "", // e.g: "USDT"
  fiat: "", // e.g: "USD"
  trade_type: "BUY" | "SELL", // default: "SELL"
  trans_amount: Number,  // default: 100
}
```

- Result

```
TODO
```

</details>

<details>

<summary><b>fetchOrderDetail(orderNumer)</b>: Returns order details</summary>

- Input:

  - orderNumber: String | Number

- Result

```
TODO
```

</details>

<details>

<summary><b>fetchOrderChatMessages(params)</b>: Returns chat messages for given orderNumber</summary>

- Params

```
{
  orderNumber: String | Number,
  page: Number, // default: 1
  rows: Number, // default: 10
}
```

- Result

```
TODO
```

</details>

<details>

<summary><b>markOrderAsPayed(params)</b>: Marks an order as payed</summary>

- Params:

```
{
  orerNumber: String,
  payId: String
}
```

- Result

```
TODO
```

</details>

<details>

<summary><b>startAd(adNumber)</b>: Marks ad as published</summary>

- Input:

  - adNumber: String | Number

- Result

```
TODO
```

</details>

<details>

<summary><b>stopAd(adNumber)</b>: Sets ad status as offline</summary>

- Input:

  - adNumber: String | Number

- Result

```
TODO
```

</details>

### TODO

- [ ] Codegen js api docs (typedoc)
- [ ] Codegen swagger api docs (swagger-express-ts or tsoa)
- [ ] Move express project into "example" folder
  - & export only the binancep2p client + 'express router' in tree-shakeable manner
  - e.g: `import { BinanceP2P } from "binance-p2p"` & `import { BinanceP2PExpressEndpoints } from "binance-p2p/express"`
- [ ] Publish to npm
