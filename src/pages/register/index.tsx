import { encrypt, plainToInstance } from "@/plugins";
import { Lock, User } from "@icon-park/react";
import { Button, Form, Input, message } from "antd";
import { Rule } from "antd/es/form";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicKey } from "../login/api";
import { RegisterParams, register } from "./api";

const loginForm: Record<string, { label: string; rules?: Rule[]; prefix: ReactNode; text: string }> = {
  account: {
    label: "account",
    rules: [{ required: true, message: "请输入账号！" }],
    prefix: <User theme="outline" size="20" fill="#333" />,
    text: "账号",
  },
  password: {
    label: "password",
    rules: [{ required: true, message: "请输入密码！" }],
    prefix: <Lock theme="outline" size="20" fill="#333" />,
    text: "密码",
  },
};

const showMessage = (text: string) => {
  message.error(text);
};

const Register = () => {
  const navigate = useNavigate();
  // const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: any) => {
    const [err, { data }] = await getPublicKey();
    if (!err) {
      const password = encrypt(data, values.password);

      const registerParams = plainToInstance(RegisterParams, {
        account: values.account,
        password,
        confirmedPassword: password,
        publicKey: data,
      });

      const [err, { message }] = await register(registerParams);
      if (!err) {
        navigate("/");
      } else {
        const msgText = `${loginForm[message[0].field].text}:${message[0].message}`;
        // messageApi.error(msgText);
        showMessage(msgText);
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
              {/* {contextHolder} */}
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
