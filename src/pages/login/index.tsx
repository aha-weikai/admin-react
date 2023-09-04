import { http } from "@/plugins/axios";
import { Button } from "antd";
import { Page } from "./css";
import { Skull } from "@icon-park/react";

type PublicKey = ArrayBuffer;

const Login = () => {
  const login = () => {
    http.get("/auth/public_key").then(res => {
      console.log("%cindex.tsx line:8 res", "color: #007acc;", res);
    });
  };
  return (
    <Page>
      <div className="flex items-center justify-center flex-1">
        <div className="bg-[#fff] w-[400px] rounded" onClick={() => login()}>
          <h1>
            <Skull theme="outline" size="24" fill="#3b82f6" />
            ahaK-admin
          </h1>
          <Button>登录</Button>
        </div>
      </div>
      <div className="flex-1"></div>
    </Page>
  );
};

export default Login;
