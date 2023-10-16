import { MenuUnfoldOne } from "@icon-park/react";
import AdminHeader from "../components/adminHeader";
import { Layout } from "antd";

const { Header } = Layout;

const TopBar = () => {
  return (
    <Layout hasSider>
      <Header style={{ position: "fixed", left: 0, right: 0, top: 0, paddingInline: 0, background: "#fff", display: "flex", justifyContent: "space-between" }}>
        <div className="flex items-center">
          <AdminHeader></AdminHeader>
          <MenuUnfoldOne theme="outline" size="24" fill="#333" />
          <div>搜索</div>
        </div>
        {/* 右侧按钮组 */}
        <div className="flex">
          <div>主题切换</div>
          <div>语言切换</div>
          <div>消息通知</div>
          <div>账号设置</div>
        </div>
      </Header>
    </Layout>
  );
};

export default TopBar;
