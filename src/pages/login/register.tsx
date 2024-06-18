import React, { useState, useRef } from "react";
import { history } from "umi";
import md5 from "md5";
import { Button, notification } from "antd";
import { useRequest } from "ahooks";
import { registerUserAPI, sendMailCodeAPI } from "@/utils/request/api/login";
import styles from "./style.less";
import "./style.less";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPwd] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [disable, setDisabled] = useState(false);
  const [code, setCode] = useState("发送验证码");
  const [count, setCount] = useState(60);
  const countRef = useRef(1);
  /**
   * 注册用户接口
   */
  const registerUserAPIRun = useRequest(
    (params: any) => registerUserAPI(params),
    {
      debounceWait: 100,
      manual: true,
      onSuccess: () => {
        history.push({ pathname: "/login" }, { username });
      },
    }
  );
  const handleLogin = () => {
    if (username && password) {
      registerUserAPIRun.run({ username, password: md5(password), verifyCode });
    } else {
      notification.error({ message: "用户名和密码必填！" });
    }
  };
  //获取验证码
  const getVerCode = () => {
    if (username) {
      sendMailCodeAPI({ mail: username }).then((res) => {
        console.log(res, "res");
      });
      let countDown = setInterval(() => {
        if (countRef.current < 1) {
          setDisabled(false);
          setCode("获取验证码");
          setCount(60);
          clearInterval(countDown);
        } else {
          setDisabled(true);
          setCount((count) => {
            setCode(count + "秒后重发");
            // console.log(112222222, count);
            countRef.current = count;
            return count - 1;
          });
        }
      }, 1000);
    } else {
      // no.error('请必须输入邮箱号码')
    }
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
                  setPwd(e.target.value);
                }}
              />
              <label>Password</label>
            </div>
            <div
              className="user-box"
              style={{ display: "flex", marginBottom: 0 }}
            >
              <input
                type="text"
                name=""
                required
                style={{ width: "70%" }}
                onChange={(e) => {
                  setVerifyCode(e.target.value);
                }}
              />
              <Button
                type="primary"
                disabled={disable}
                style={{ background: "green", color: "#fff" }}
                onClick={getVerCode}
              >
                {code}
              </Button>
            </div>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push("/login");
              }}
            >
              去登录
            </p>
            <center>
              <a onClick={handleLogin}>
                注册
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
