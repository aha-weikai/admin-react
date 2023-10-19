import { GameHandle } from "@icon-park/react";
import { Layout } from "antd";
import { CollapsedContext } from "../context";
import { useContext } from "react";
import styled from "styled-components";

const AdminHeader = () => {
  const collapsed = useContext(CollapsedContext);
  return (
    <AdminTitle>
      <div className="py-[2px] flex">
        <GameHandle theme="multi-color" size="28" fill={["#333", "#66a7fc", "#FFF", "#43CCF8"]} />
      </div>
      {collapsed ? "" : <div className="text-neutral-700 text-center font-semibold   title">KK-admin</div>}
    </AdminTitle>
  );
};

export default AdminHeader;

const AdminTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem /* 12px */;

  .title {
    animation-duration: 0.2s;
    animation-name: fontSize;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
  }

  @keyframes fontSize {
    0% {
      font-size: 0.3rem;
    }

    100% {
      font-size: 1.5rem /* 24px */;
      line-height: 2rem /* 32px */;
    }
  }
`;
