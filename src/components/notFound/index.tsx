import React from "react";
import "./style.less";

export default function Index({
  placeholder = "NOT FOUND",
  handleOpenLogin,
  screen,
}: {
  placeholder: string;
  handleOpenLogin: () => void;
  screen: any;
}) {
  return (
    <div className="main_wrapper">
      <div className="mainTv" id="mainTv">
        <div className="antenna">
          <div className="antenna_shadow"></div>
          <div className="a1"></div>
          <div className="a1d"></div>
          <div className="a2"></div>
          <div className="a2d"></div>
          <div className="a_base"></div>
        </div>
        <div className="tv">
          <div className="cruve">
            <img
              src={require("@/assets/iconsvg/tv.svg")}
              alt=""
              className="curve_svg"
            />
          </div>
          <div className="display_div">
            <div className="screen_out">
              <div className="screen_out1">
                <div className="screen" id="screen">
                  <span
                    className="notfound_text"
                    onClick={() => {
                      debugger;
                      handleOpenLogin();
                    }}
                  >
                    {placeholder}
                  </span>
                </div>
                <div
                  className="screen"
                  id="screenOpen"
                  style={{ display: "none" }}
                >
                  {screen}
                </div>
              </div>
            </div>
          </div>
          <div className="lines">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
          <div className="buttons_div">
            <div
              className="btnOn"
              onClick={() => {
                handleOpenLogin();
              }}
            >
              <div></div>
            </div>
            <div className="b2"></div>
            <div className="speakers">
              <div className="g1">
                <div className="g11"></div>
                <div className="g12"></div>
                <div className="g13"></div>
              </div>
              <div className="g"></div>
              <div className="g"></div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="base1"></div>
          <div className="base2"></div>
          <div className="base3"></div>
        </div>
      </div>
      <div className="text_404">
        <div className="text_4041">4</div>
        <div className="text_4042">0</div>
        <div className="text_4043">4</div>
      </div>
    </div>
  );
}
