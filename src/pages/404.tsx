import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { history } from "umi";

const Index = () => {
  return (
    <div>
      <p>404</p>
      <Button
        onClick={() => {
          history.push("/");
        }}
      >
        回到首页
      </Button>
    </div>
  );
};

export default Index;
