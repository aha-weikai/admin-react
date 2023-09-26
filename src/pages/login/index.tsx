import { verifyAccount, verifyPassword } from "@/utils";
import { Lock, ShieldAdd, Skull, User } from "@icon-park/react";
import { Button, Form, Input } from "antd";
import { Rule } from "antd/es/form";
import { ReactNode, useEffect, useState } from "react";
import { login } from "./api";
import { Page } from "./css";
import JSEncrypt from "jsencrypt";
import { LoginParams } from "./model";
import { plainToInstance } from "@/utils";

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
  const [captchaSvg, setCaptchaSvg] = useState("");
  let captchaKey = "";
  const getCaptcha = async () => {
    const [err, data] = await login.getCaptcha();
    if (!err) {
      setCaptchaSvg(data.data);
      captchaKey = data.captchaKey;
    }
  };
  useEffect(() => {
    getCaptcha();
  }, []);

  const onFinish = async (values: any) => {
    const [err, data] = await login.getPublicKey();
    console.log(values);
    const newData = plainToInstance(LoginParams, values);
    console.log(newData);
    if (!err) {
      console.log(data);
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(data);
      const password = values.password;
      const encrypted = encrypt.encrypt(password);
      console.log(encrypted);
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
