import React, { useState } from "react";
import styles from "./style.less";
import "./style.less";

const Login = () => {
    return (
        <div className={styles.login}>
            <div className={styles.showImg}>
                9999
            </div>
            <div className={styles.userInfo}>
                <div className="login-box">
                    <form>
                        <div className="user-box">
                            <input type="text" name="" required />
                            <label>Username</label>
                        </div>
                        <div className="user-box">
                            <input type="password" name="" required />
                            <label>Password</label>
                        </div>
                        <center>
                            <a href="#">
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
