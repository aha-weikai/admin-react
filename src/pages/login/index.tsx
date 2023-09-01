import axios from "axios";

type PublicKey = ArrayBuffer;

const Login = () => {
  const controller = new AbortController();
  axios.interceptors.request.use(function () {
    throw new Error("取消重复请求");
  });
  console.log(controller.signal);
  const login = () => {
    axios
      .get<PublicKey>("http://localhost:3000/api/auth/public_key", {
        signal: controller.signal,
      })
      .then(res => {
        console.log(res);
      });
    controller.abort();
    console.log(controller.signal);
  };
  return <div onClick={() => login()}>登录</div>;
};

export default Login;
