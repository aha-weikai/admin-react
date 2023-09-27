import JSEncrypt from "jsencrypt";

export function encrypt(publicKey: string, str: string) {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(str);
}
