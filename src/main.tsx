import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import { router } from "./router";
import "@/assets/css/index.css";

import { setupPlugin } from "@/plugins";

setupPlugin(App());

/* <React.StrictMode> */

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<RouterProvider router={router} />);
