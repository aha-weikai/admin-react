export * from "./is";
export * from "./regexp";

export function arrayIsNotHave(arr: any[], data: any): arr is Omit<any, typeof data>[] {
  return arr.some(item => item === data);
}
