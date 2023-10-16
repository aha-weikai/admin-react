import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import React from "react";
import AdminHeader from "../components/adminHeader";

const { Sider } = Layout;

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, BarChartOutlined, CloudOutlined, AppstoreOutlined, TeamOutlined, ShopOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  })
);

const LeftMenu = () => {
  return (
    <Layout hasSider style={{ display: "flex", flexDirection: "column", flex: 0 }}>
      <AdminHeader></AdminHeader>
      <Sider
        style={{
          overflow: "auto",
          position: "fixed",
          left: 0,
          flex: "1",
        }}
        theme={"light"}
      >
        <Menu theme="light" mode="inline" defaultSelectedKeys={["4"]} items={items}></Menu>
      </Sider>
    </Layout>
  );
};

export default LeftMenu;
