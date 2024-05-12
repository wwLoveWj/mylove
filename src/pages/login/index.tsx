import React, { useState } from "react";
import styles from "./style.less";
// import "./style.less";
import TvImg from "@/components/notFound/index";

const Login = () => {
  const [placeholder, setPlaceholder] = useState("LOGIN");
  const [screenDom, setScreenDom] = useState<React.JSX.Element>(); //存放电视开机后的页面
  const handleOpenLogin = () => {
    let screen = document.getElementById("screen") as HTMLDivElement;
    screen.style.display = "none";
    let screenOpen = document.getElementById("screenOpen") as HTMLDivElement;
    screenOpen.style.display = "block";
    // screenOpen.style.background = "red";

    // let mainTv = document.getElementById("mainTv") as HTMLDivElement;
    // mainTv.style.transform = "scale(3)";
    // mainTv.style.transition = "3s";
    // mainTv.style.position = "absolute";
    // mainTv.style.right = "-7px";
    // mainTv.style.top = "-30px";
    let screenDom1 = () => {
      return (
        <div className={styles.tvGif}>
          <img src={require("@/assets/imgs/tv.gif")} alt="" />
        </div>
      );
    };
    setScreenDom(screenDom1);
    setPlaceholder("欢迎登录！");
  };
  return (
    <div className={styles.login}>
      {/* <div className={styles.showImg}>
        9999
      </div>
      <div className={styles.userInfo}>666666</div> */}
      <TvImg
        placeholder={placeholder}
        handleOpenLogin={handleOpenLogin}
        screen={screenDom}
      />
    </div>
  );
};

export default Login;
