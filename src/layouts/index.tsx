import { Layout, Menu } from "antd";
// import Content from "./centerContent";
import LeftMenu from "./leftMenu";
import TopBar from "./topBar";
import React from "react";

const { Header, Content, Footer, Sider } = Layout;
// TODO 使用antd的layout布局
const LayOut = () => {
  const colorBgContainer = "#fff";
  return (
    <>
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]} items={items} />
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div style={{ padding: 24, textAlign: "center", background: colorBgContainer }}>
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

      <TopBar></TopBar>
      <div className="flex">
        <div className="">
          <LeftMenu></LeftMenu>
        </div>
        <div className="content">
          <Content></Content>
        </div>
      </div>
    </>
  );
};

export default LayOut;
