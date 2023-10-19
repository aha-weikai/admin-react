import LayOut from "@/layouts";
import Login from "@/pages/login";
import Register from "@/pages/register";
import ResetPassword from "@/pages/resetPassword";
import { createBrowserRouter } from "react-router-dom";

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
  {
    path: "*",
    Component: LayOut,
    children: [],
  },
]);

export const toLogin = () => {
  router.navigate("/user/login");
};
