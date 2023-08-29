import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { JSEncrypt } from "jsencrypt";

function App() {
  const [count, setCount] = useState(0);
  const [password, setPassword] = useState("");

  const [publicKey, setPublicKey] = useState("");

  const baseUrl = "http://localhost:3000/api";
  const getPublicKey = () => {
    fetch(baseUrl + "/auth/public_key").then(async res => {
      console.log(res);
      const data = await res.text();
      setPublicKey(data);
      console.log(data);
    });
  };

  const login = () => {
    const encrypt = new JSEncrypt();
    if (publicKey) {
      encrypt.setPublicKey(publicKey);
      const res = encrypt.encrypt("admin888");
      console.log(res);
      setPassword(res as string);
    }

    const data = new FormData();
    data.append("account", "admin");
    data.append("password", password);
    data.append("publicKey", publicKey);

    const body = {
      account: "admin",
      password,
      publicKey,
    };

    fetch(baseUrl + "/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body),
    }).then(res => {
      console.log(res);
    });
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <button onClick={() => getPublicKey()}>获取publicKey</button>
        <button onClick={() => login()}>登录</button>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
