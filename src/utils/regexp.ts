export function verifyPassword(password: string) {
  if (typeof password !== "string") throw new TypeError("Expected a string");
  const reg =
    /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/;
  return reg.test(password);
}

export function verifyAccount(str: string) {
  if (typeof str !== "string") throw new TypeError(`Expected a string`);
  const reg = /^[\w-]{4,16}$/;
  return reg.test(str);
}
