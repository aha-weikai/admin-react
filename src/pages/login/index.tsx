import { http } from "@/plugins/axios";

type PublicKey = ArrayBuffer;

const Login = () => {
  const login = () => {
    http.get("/auth/public_key").then(res => {
      console.log("%cindex.tsx line:8 res", "color: #007acc;", res);
    });
  };
  return <div onClick={() => login()}>登录</div>;
};

export default Login;
