export function isArray(data: unknown) {
  return Array.isArray(data);
}

export function isFunction(data: unknown) {
  return typeof data === "function";
}
