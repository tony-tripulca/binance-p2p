const sha256 = require("js-sha256");

function createSignature(secret, data) {
  return sha256.hmac.create(secret).update(data).hex();
}

function objectToQuerystring(data) {
  return Object.keys(data)
    .map((key) => key + "=" + data[key])
    .join("&");
}

module.exports = {
  createSignature,
  objectToQuerystring,
};
