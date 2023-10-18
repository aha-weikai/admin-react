import { Dvi, MenuUnfoldOne } from "@icon-park/react";
import AdminHeader from "../components/adminHeader";
import { Button, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { CollapsedContext } from "../context";
import React from "react";

const { Header } = Layout;

const TopBar = ({ setCollapsed }: { setCollapsed: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const collapsed = useContext(CollapsedContext);
  return (
    <div className="flex items-center">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      {/* 右侧按钮组 */}
      <div className="flex">
        <div>主题切换</div>
        <div>语言切换</div>
        <div>消息通知</div>
        <div>账号设置</div>
      </div>
    </div>
  );
};

export default TopBar;
