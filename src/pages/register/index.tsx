import { plainToInstance } from "@/utils";
import { Lock, User } from "@icon-park/react";
import { Button, Form, Input } from "antd";
import { Rule } from "antd/es/form";
import JSEncrypt from "jsencrypt";
import { ReactNode } from "react";
import { login } from "../login/api";
import { RegisterParams, register } from "./api";

const loginForm: Record<string, { label: string; rules?: Rule[]; prefix: ReactNode }> = {
  account: {
    label: "account",
    rules: [{ required: true, message: "请输入账号！" }],
    prefix: <User theme="outline" size="20" fill="#333" />,
  },
  password: {
    label: "password",
    rules: [{ required: true, message: "请输入密码！" }],
    prefix: <Lock theme="outline" size="20" fill="#333" />,
  },
};

const Register = () => {
  const onFinish = async (values: any) => {
    const [err, data] = await login.getPublicKey();
    if (!err) {
      console.log(data);
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(data);
      const password = encrypt.encrypt(values.password);
      const registerParams = plainToInstance(
        RegisterParams,
        {
          account: values.account,
          password,
          confirmedPassword: password,
          publicKey: data,
        },
        { excludeExtraneousValues: true }
      );
      console.log("%cindex.tsx line:44 registerParams", "color: #007acc;", registerParams);
      const [err, rData] = await register(registerParams);
      if (!err) {
        console.log(rData);
      }
    }
  };

  return (
    <div className="w-[600px] h-screen flex flex-col justify-center items-center">
      <div className="flex items-center justify-center flex-1">
        <div className="login-card">
          <h6 className="text-sm text-gray-400 text-center mb-8">注册</h6>
          <Form name="register" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off" className="w-[300px] mx-auto">
            {Object.entries(loginForm).map(([key, { label, rules, prefix }]) => (
              <div key={key} className="flex">
                <Form.Item name={key} rules={rules} key={key} validateFirst className="flex-1">
                  {key === "password" ? <Input.Password prefix={prefix} className="w-full" /> : <Input prefix={prefix} />}
                </Form.Item>
              </div>
            ))}
            <Form.Item className="flex justify-center">
              <Button type="primary" htmlType="submit">
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="flex-1"></div>
    </div>
  );
};

export default Register;
