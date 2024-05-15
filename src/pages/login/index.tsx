import React, { useState } from "react";
import { history } from "umi";
import md5 from "md5";
import { useRequest } from "ahooks";
import {loginUserAPI} from "@/utils/request/api/login";
import styles from "./style.less";
import "./style.less";

interface LoginInfoType {
  username: string;
  token: string;
}
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPwd] = useState("");

  /**
   * 注册用户接口
   */
  const registerUserAPIRun = useRequest(
    (params: any) => loginUserAPI(params),
    {
      debounceWait: 100,
      manual: true,
      onSuccess: (res: LoginInfoType) => {
        localStorage.setItem("login-info", JSON.stringify(res));
        history.push("/");
      }
    }
  );
  const handleLogin = () => {
    registerUserAPIRun.run({ username, password:md5(password) });
  };
  return (
    <div className={styles.login}>
      <div className={styles.showImg}>9999</div>
      <div className={styles.userInfo}>
        <div className="login-box">
          <form>
            <div className="user-box">
              <input
                type="text"
                name=""
                required
                onChange={(e) => {
                  console.log(e.target.value, "name");
                  setUsername(e.target.value);
                }}
              />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name=""
                required
                value={password}
                onChange={(e) => {
                  console.log(e.target.value, "password");
                  setPwd(e.target.value);
                }}
              />
              <label>Password</label>
            </div>
            <center>
              <a onClick={handleLogin}>
                SEND
                <span></span>
              </a>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
