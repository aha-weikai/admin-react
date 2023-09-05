import { http } from "@/plugins/axios";
import { Skull } from "@icon-park/react";
import { Button, Checkbox, Form, Input } from "antd";
import { Page } from "./css";
import { Rule } from "antd/es/form";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  account?: string;
  password?: string;
  remember?: string;
};
const loginRules: Record<string, Rule[]> = {
  account: [
    { required: true, message: "请输入账号！" },
    { max: 20, message: "账号最长为20个字母" },
    { max: 6, message: "账号最短为6个字母" },
  ],
  password: [
    { required: true, message: "请输入密码！" },
    { max: 20, message: "密码最长为20个字母" },
    { min: 20, message: "密码最短为6个字母" },
  ],
  captcha: [{ required: true, message: "请输入验证码！" }],
};

const Login = () => {
  const login = () => {
    http.get("/auth/public_key").then(res => {
      console.log("%cindex.tsx line:8 res", "color: #007acc;", res);
    });
  };
  return (
    <Page>
      <div className="flex items-center justify-center flex-1">
        <div className="login-card">
          <h1 className="text-xl pb-2">
            <Skull theme="outline" size="24" fill="#3b82f6" className="pr-2" />
            ahaK-admin
          </h1>
          <Form
            name="login"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType> label="account" name="account" rules={[{ required: true, message: "请输入" }]}>
              <Input />
            </Form.Item>

            <Form.Item<FieldType> label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType> name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
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
