import React from "react";
import "./style.less";

export default function Index() {
  return (
    <div className="tooltip-container">
      <div className="tooltip">
        <div className="text">Save Tree</div>
        <div className={["leaf", "leaf1"].join(" ")}></div>
        <div className={["leaf", "leaf2"].join(" ")}></div>
        <div className={["leaf", "leaf3"].join(" ")}></div>
        <div className={["leaf", "leaf4"].join(" ")}></div>
      </div>
      <div className={["leaf", "icon"].join(" ")}></div>
    </div>
  );
}
