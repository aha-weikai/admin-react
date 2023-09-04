import { setup as resetcss } from "./resetcss";
import { setup as tailwindcss } from "./tailwindcss";

const setupArr = [resetcss, tailwindcss];

export function setupPlugin(App: JSX.Element) {
  setupArr.forEach(fn => {
    fn(App);
  });
}
