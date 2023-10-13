import { MenuUnfoldOne } from "@icon-park/react";

const TopBar = () => {
  return (
    <div className="flex">
      <div className="">
        <div>kk-admin</div>
        <MenuUnfoldOne theme="outline" size="24" fill="#333" />
        <div>搜索</div>
      </div>
      {/* 右侧按钮组 */}
      <div className="">
        <div>主题切换</div>
        <div>语言切换</div>
        <div>消息通知</div>
        <div>账号设置</div>
      </div>
    </div>
  );
};

export default TopBar;
