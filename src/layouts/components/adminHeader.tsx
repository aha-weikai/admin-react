import { GameHandle } from "@icon-park/react";
import { Layout } from "antd";

const { Sider } = Layout;

const AdminHeader = () => {
  return (
    <Layout hasSider>
      <Sider style={{ overflow: "auto" }} theme={"light"}>
        <div className="flex justify-center items-center p-3">
          <GameHandle theme="multi-color" size="28" fill={["#333", "#66a7fc", "#FFF", "#43CCF8"]} />
          <div className="text-neutral-700 text-center font-semibold text-2xl">KK-admin</div>
        </div>
      </Sider>
    </Layout>
  );
};

export default AdminHeader;
