import React, { useState, useEffect } from "react";
import "./style.less";

const Index = () => {
  return (
    <section>
      <div className="color"></div>

      <div className="color"></div>

      <div className="color"></div>

      <div className="box">
        {[0, 1, 2, 3, 4].map((item) => {
          return (
            <div key={item} className="square" style={{ "--i": item }}></div>
          );
        })}
        <div className="container">
          <div className="form">
            <h2>Login Form</h2>
            <form>
              <div className="inputBox">
                <input type="text" placeholder="Username" />
              </div>

              <div className="inputBox">
                <input type="password" placeholder="Password" />
              </div>

              <div className="inputBox">
                <input type="submit" value="Login" />
              </div>

              <p className="forget">
                Forget Password ?<a href="#">Click Here</a>
              </p>

              <p className="forget">
                Don't have an account ?<a href="#">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
