import sha256 from "js-sha256";

const Hash = {
  create: (secret, data) => {
    return sha256.hmac.create(secret).update(data).hex();
  },
  toQueryString: (data) => {
    return Object.keys(data)
      .map((key) => key + "=" + data[key])
      .join("&");
  },
};

export default Hash;
