import React from "react";
import "./style.css";

export default function Index() {
  return (
    <div className="coin">
      <div className={["side", "heads"].join(" ")}>
        <img src={require("@/assets/iconsvg/money.svg")} alt="" />
      </div>
      <div className={["side", "tails"].join(" ")}>
        <img
          src={require("@/assets/iconsvg/moneyback.svg")}
          alt=""
          className="svg_back"
        />
      </div>
    </div>
  );
}
