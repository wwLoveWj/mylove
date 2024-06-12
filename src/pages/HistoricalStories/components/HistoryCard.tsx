import React, { useState, useEffect } from "react";
import styles from "../style.less";
import { historicalFigureInfoType } from "../type";
import { Button, Tag, Flex } from "antd";
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
      <div
        key={historyDetails.id}
        className={styles.allCardInfo}
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
        <h3 className={styles.title}>{historyDetails.title}</h3>
        <p className={styles.desc}>简介:{historyDetails.desc}</p>
        {/* <div className={styles.tag}>概括:{historyDetails.tag}</div> */}
        <div className={styles.tag}>
          {/* <Flex gap="4px 0" wrap={"warp"}> */}
          {historyDetails?.tag?.map((item) => {
            return (
              <Tag color="magenta" key={item} className={styles.tagVal}>
                {item}
              </Tag>
            );
          })}
          {/* </Flex> */}
        </div>
      </div>
      {/* {isShowFigure && <HistoricalFigure />} */}
      {nodeB}
    </>
  );
};

export default Index;
