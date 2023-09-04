import { http } from "@/plugins/axios";
import { Button } from "antd";
import { Page } from "./css";

type PublicKey = ArrayBuffer;

const Login = () => {
  const login = () => {
    http.get("/auth/public_key").then(res => {
      console.log("%cindex.tsx line:8 res", "color: #007acc;", res);
    });
  };
  return (
    <Page>
      <div className="left">
        <div className="login-card " onClick={() => login()}>
          <Button>登录</Button>
        </div>
      </div>
      <div className="right"></div>
    </Page>
  );
};

export default Login;
