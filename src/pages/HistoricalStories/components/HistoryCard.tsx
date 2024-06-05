import React, { useState, useEffect } from "react";
import styles from "../style.less";
import { historicalFigureInfoType } from "../type";
import { Button } from "antd";
import HistoricalFigure from "./HistoricalFigure";
import ReactDOM from "react-dom";

const Index = ({
  historyDetails,
}: {
  historyDetails: historicalFigureInfoType;
}) => {
  const [isShowFigure, setIsShowFigure] = useState(false);
  const [nodeB, SetNode] = useState<any>();
  return (
    <>
      <div key={historyDetails.id} className={styles.allCardInfo}>
        <h3 className={styles.title}>{historyDetails.title}</h3>
        <div className={styles.desc}>{historyDetails.desc}</div>
        <Button
          onClick={() => {
            // setIsShowFigure(true);
            const root = document.getElementById("root") as Element;
            const span = document.createElement("span") as HTMLSpanElement;
            span.style.width = "400px";
            span.style.height = "500px";
            span.style.background = "red";
            SetNode(ReactDOM.createPortal(<HistoricalFigure />, root));
          }}
        >
          click
        </Button>
      </div>
      {/* {isShowFigure && <HistoricalFigure />} */}
      {nodeB}
    </>
  );
};

export default Index;
