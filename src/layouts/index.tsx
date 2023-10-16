import { Layout, Menu } from "antd";
// import Content from "./centerContent";
import LeftMenu from "./leftMenu";
import TopBar from "./topBar";
import React from "react";

const { Header, Content, Footer, Sider } = Layout;
// TODO 使用antd的layout布局
const LayOut = () => {
  const colorBgContainer = "green";
  return (
    <Layout style={{ display: "flex", flexDirection: "row" }}>
      <LeftMenu></LeftMenu>
      <Layout style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopBar></TopBar>
        <Content style={{ overflow: "initial", background: "green" }}>
          <div style={{ textAlign: "center", background: colorBgContainer }}>
            <p>long content</p>
            {
              // indicates very long content
              Array.from({ length: 100 }, (_, index) => (
                <React.Fragment key={index}>
                  {index % 20 === 0 && index ? "more" : "..."}
                  <br />
                </React.Fragment>
              ))
            }
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default LayOut;
