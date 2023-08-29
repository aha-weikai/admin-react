import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@/pages/login";
import ResetPassword from "@/pages/resetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/user/login",
    Component: Login,
  },
  {
    path: "/user/reset-password",
    Component: ResetPassword,
  },
]);

export const toLogin = () => {
  router.navigate("/user/login");
};
