import { Layout, theme } from "antd";

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Breadcrumb from "./components/Breadcrumb";
import AdminHeader from "./components/adminHeader";
import { CollapsedContext } from "./context";
import LeftMenu from "./leftMenu";
import TopBar from "./topBar";

const { Header, Content, Sider } = Layout;

const LayOut = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ position: "fixed", left: 0, right: 0, bottom: 0, top: 0 }}>
      <CollapsedContext.Provider value={collapsed}>
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
          <AdminHeader></AdminHeader>
          <LeftMenu></LeftMenu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <TopBar setCollapsed={setCollapsed}></TopBar>
          </Header>
          <Breadcrumb></Breadcrumb>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </CollapsedContext.Provider>
    </Layout>
  );
};

export default LayOut;
