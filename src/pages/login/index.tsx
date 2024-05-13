import React, { useState } from "react";
import styles from "./style.less";
import "./style.less";
import { history } from "umi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  const handleLogin = () => {
    localStorage.setItem(
      "login-info",
      JSON.stringify({
        username,
        pwd,
      })
    );
    history.push("/");
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
                value={pwd}
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
