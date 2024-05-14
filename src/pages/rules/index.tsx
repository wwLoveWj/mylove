import React, { useState, useEffect } from "react";
import CreateRules from "./CreateRules";

const Index = () => {
  return (
    <div>
      {/* <h1>规则标准：</h1>
      <p>1.到了23:30必须上床睡觉，未做到者扣除1分；</p>
      <p>2.</p> */}
      <CreateRules />
    </div>
  );
};

export default Index;
