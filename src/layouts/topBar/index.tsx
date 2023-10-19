import { DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import React, { useContext } from "react";
import { CollapsedContext } from "../context";
import styled from "styled-components";
import { User } from "@icon-park/react";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];

const TopBar: React.FC<TopBarProps> = ({ setCollapsed }) => {
  const collapsed = useContext(CollapsedContext);
  return (
    <div className="flex items-center justify-between">
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
      <RightBtns>
        <div>主题切换</div>
        <div>语言切换</div>
        <div>消息通知</div>
        <div>
          <Dropdown
            trigger={["click"]}
            dropdownRender={() => {
              return (
                <div style={{}} className="dark:bg-[rgb(33,41,70)] bg-white rounded-lg w-[200px]">
                  <div className="p-[16px]">
                    <p className="text-[16px] dark:text-[rgb(237,242,247)] text-[rgb(17,25,39)] ">{"管理员"}</p>
                    <p className="text-[rgb(108,115,127)] dark:text-[rgb(160,174,192)] mt-[10px]">{"测试"}</p>
                    <p className="text-[rgb(108,115,127)] dark:text-[rgb(160,174,192)] mt-[0px]">{"测试"}</p>
                  </div>
                  <hr style={{ borderWidth: "0 0 thin" }} className="m-[0] border-solid dark:border-[rgb(45,55,72)] border-[rgb(242,244,247)]" />
                  <div className="p-[16px] text-center">
                    <Button type="text" size="small">
                      退出登录
                    </Button>
                  </div>
                </div>
              );
            }}
          >
            <Button shape="circle">
              <User theme="multi-color" size="20" fill={["#333", "#2F88FF", "#FFF", "#43CCF8"]} />
            </Button>
          </Dropdown>
        </div>
      </RightBtns>
    </div>
  );
};

export default TopBar;

interface TopBarProps {
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const RightBtns = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-right: 16px;
  }
`;
