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
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={[
        {
          key: "1",
          icon: <UserOutlined />,
          label: "nav 1",
        },
        {
          key: "2",
          icon: <VideoCameraOutlined />,
          label: "nav 2",
        },
        {
          key: "3",
          icon: <UploadOutlined />,
          label: "nav 3",
        },
      ]}
    />
  );
};

export default LeftMenu;
