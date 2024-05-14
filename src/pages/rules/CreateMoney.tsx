import React, { useState, useEffect } from "react";
import { getMoneySvg } from "@/utils/request/api/rule.ts";
import styles from "./style.less";

const Index = () => {
  const [show, setShow] = useState<any>("");

  const getMoneySvgApi = async () => {
    let res = await getMoneySvg({});
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(res, "text/html");
    setShow(res);
  };
  useEffect(() => {
    getMoneySvgApi();
  }, []);
  return (
    <div className={styles.money}>
      <div dangerouslySetInnerHTML={{ __html: show }}></div>
    </div>
  );
};

export default Index;
