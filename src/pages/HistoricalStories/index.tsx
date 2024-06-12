import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
// import styles from "./style.less";
import HistoryCard from "./components/HistoryCard";
import { historicalFigureInfoType } from "./type";

const Index = () => {
  const dynastyList: historicalFigureInfoType[] = [
    {
      id: 0,
      title: "唐",
      desc: "从唐高祖李渊开始，到唐玄宗结束，经理多少多少年，结束于xxx",
    },
    {
      id: 1,
      title: "宋",
      desc: "从宋太祖赵匡胤陈桥驿兵变开始，到宋xxx结束",
    },
    {
      id: 2,
      title: "元",
      desc: "从成吉思汗开始，到xxx结束",
    },
  ];
  const historyList: historicalFigureInfoType[] = [
    {
      id: 0,
      title: "唐",
      honor: "荣誉",
      lifeAndDeath: "生平",
      desc: "这段历史的描述",
      tag: [
        "安史之乱",
        "天可汗",
        "武则天",
        "马嵬坡之变",
        "永乐大典",
        "万国来朝",
      ],
    },
    {
      id: 1,
      title: "宋",
      honor: "荣誉",
      lifeAndDeath: "生平",
      desc: "这段历史的描述",
      tag: [
        "黄袍加身",
        "靖康耻，犹未雪",
        "崇文抑武",
        "澶渊之盟",
        "联蒙灭金",
        "经济最强",
      ],
    },
    {
      id: 2,
      title: "元",
      honor: "荣誉",
      lifeAndDeath: "生平",
      desc: "这段历史的描述",
      tag: ["上帝之鞭", "成吉思汗", "忽必烈", "版图最大"],
    },
    {
      id: 3,
      title: "明",
      honor: "荣誉",
      lifeAndDeath: "生平",
      desc: "这段历史的描述",
      tag: [
        "天子守国门",
        "瓦剌留学生",
        "土木堡之变",
        "靖难之役",
        "永乐盛世",
        "锦衣卫",
        "东厂",
        "郑和下西洋",
      ],
    },
  ];
  return (
    <Row gutter={16}>
      {historyList.map((item) => {
        return (
          <Col span={8} key={item.id}>
            <HistoryCard historyDetails={item} />
          </Col>
        );
      })}
    </Row>
  );
};

export default Index;
