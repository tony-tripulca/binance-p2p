import sha256 from "js-sha256";

export function createSignature(secret: string, data: any) {
  // @ts-ignore
  return sha256.hmac.create(secret).update(data).hex();
}

export function objectToQuerystring(data: any) {
  return Object.keys(data)
    .map((key) => key + "=" + data[key])
    .join("&");
}
