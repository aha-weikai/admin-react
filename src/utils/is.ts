export function isArray(data: unknown): data is [] {
  return Array.isArray(data);
}

export function isFunction(data: unknown) {
  return typeof data === "function";
}

export function is2DArrays(data: unknown): data is any[][] {
  if (isArray(data)) {
    return data.some(item => isArray(item));
  } else {
    return false;
  }
}
