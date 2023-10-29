import { encrypt } from "@/plugins";
import { verifyAccount, verifyPassword } from "@/utils";
import { Lock, ShieldAdd, Skull, User } from "@icon-park/react";
import { Button, Form, Input, message } from "antd";
import { Rule } from "antd/es/form";
import { ReactNode, useEffect, useRef, useState } from "react";
import * as api from "./api";
import { Page } from "./css";
import { useNavigate } from "react-router-dom";

const loginForm: Record<string, { label: string; rules?: Rule[]; prefix: ReactNode }> = {
  account: {
    label: "account",
    rules: [
      { required: true, message: "请输入账号！" },
      { max: 20, message: "账号最长为20个字母" },
      { min: 6, message: "账号最短为6个字母" },
      () => ({
        validator(_, value) {
          if (verifyAccount(value)) return Promise.resolve();
          return Promise.reject(new Error("账户为字母，数字，下划线，减号"));
        },
      }),
    ],
    prefix: <User theme="outline" size="20" fill="#333" />,
  },
  password: {
    label: "password",
    rules: [
      { required: true, message: "请输入密码！" },
      { max: 20, message: "密码最长为20个字母" },
      { min: 6, message: "密码最短为6个字母" },
      () => ({
        validator(_, value) {
          if (verifyPassword(value)) return Promise.resolve();
          return Promise.reject(new Error("密码为字母，数字和键盘符号"));
        },
      }),
    ],
    prefix: <Lock theme="outline" size="20" fill="#333" />,
  },
  captcha: {
    label: "captcha",
    rules: [{ required: true, message: "请输入验证码！" }],
    prefix: <ShieldAdd theme="outline" size="20" fill="#333" />,
  },
};

const Login = () => {
  api.getUserInfo();
  const navigate = useNavigate();

  const [captchaSvg, setCaptchaSvg] = useState("");
  const captchaKey = useRef("");
  const getCaptcha = async () => {
    const [err, { data }] = await api.getCaptcha();
    if (!err) {
      setCaptchaSvg(data.data);
      captchaKey.current = data.captchaKey;
    }
  };
  useEffect(() => {
    getCaptcha();
  }, []);

  const onFinish = async (values: any) => {
    const [err, { data: publicKey, message: errMsg }] = await api.getPublicKey();
    if (err) {
      message.error(errMsg);
      return;
    }
    login(values, publicKey);
  };

  const login = async (values: { password: string; account: any; captcha: any }, publicKey: string) => {
    const password = encrypt(publicKey, values.password);
    if (password) {
      const newData = {
        account: values.account,
        password,
        captchaKey: captchaKey.current,
        publicKey,
        captchaData: values.captcha,
      };
      const [err] = await api.login(newData);
      if (err) {
        message.error("登录失败");
        return;
      } else {
        navigate({ pathname: "/home" });
      }
    } else {
      message.warning("请检查密码是否正确");
    }
  };

  const CaptchaSvg = <div dangerouslySetInnerHTML={{ __html: captchaSvg }} className="h-[32px] w-[150px]" onClick={() => getCaptcha()}></div>;

  return (
    <Page>
      <div className="flex items-center justify-center flex-1">
        <div className="login-card">
          <h1 className="text-xl pb-2 text-center">
            <Skull theme="outline" size="24" fill="#3b82f6" className="pr-2" />
            ahaK-admin
          </h1>
          <h6 className="text-sm text-gray-400 text-center mb-8">初代的后台管理系统</h6>
          <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off" className="w-[300px] mx-auto">
            {Object.entries(loginForm).map(([key, { label, rules, prefix }]) => (
              <div key={key} className="flex">
                <Form.Item name={key} rules={rules} key={key} validateFirst className="flex-1">
                  {key === "password" ? <Input.Password prefix={prefix} className="w-full" /> : <Input prefix={prefix} />}
                </Form.Item>
                {key === "captcha" ? CaptchaSvg : undefined}
              </div>
            ))}

            <Form.Item className="flex justify-center">
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="flex-1"></div>
    </Page>
  );
};

export default Login;
