import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@/pages/login";
import ResetPassword from "@/pages/resetPassword";
import Register from "@/pages/register";

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
  {
    path: "/user/register",
    Component: Register,
  },
]);

export const toLogin = () => {
  router.navigate("/user/login");
};
