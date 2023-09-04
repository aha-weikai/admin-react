import { setup as resetcss } from "./resetcss";
import { setup as tailwindcss } from "./tailwindcss";
import { setup as iconpark } from "./iconpark";

const setupArr = [resetcss, tailwindcss, iconpark];

export function setupPlugin(App: JSX.Element) {
  setupArr.forEach(fn => {
    fn(App);
  });
}
