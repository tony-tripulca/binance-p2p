import crypto from "crypto";

const Hash = {
  createSignature: (secret, data) => {
    return crypto.createHmac("sha256", secret).update(data).digest("hex");
  },
  toQueryString: (data) => {
    return Object.keys(data)
      .map((key) => key + "=" + data[key])
      .join("&");
  },
};

export const { createSignature, toQueryString } = Hash;
