import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import { router } from "./router";
import "@/assets/css/index.css";

import { setupPlugin } from "@/plugins";

const app = App();

setupPlugin(app);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(app);
