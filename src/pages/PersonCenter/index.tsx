import React, { useState, useEffect } from "react";
import IndividuationTable from "@/components/IndividuationTable";
import "./style.less";

const Index = () => {
  /**
   *@param val 获取名字搜索
   */
  const onSearchName = (val: string) => {
    debugger;
  };
  return (
    <div className="center">
      <IndividuationTable onSearchName={onSearchName} />
    </div>
  );
};

export default Index;
