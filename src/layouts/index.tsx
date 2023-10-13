import Content from "./centerContent";
import LeftMenu from "./leftMenu";
import TopBar from "./topBar";

const LayOut = () => {
  return (
    <>
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
