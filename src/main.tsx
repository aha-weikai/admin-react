import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

// {
//   /* <React.StrictMode> */
// }
// {
//   /* </React.StrictMode> */
// }

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<RouterProvider router={router} />);
