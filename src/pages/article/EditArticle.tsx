import React, { useState, useEffect } from "react";
import WjEditor from "@/components/WjEditor/index";
import { useLocation } from "umi";

const Index = () => {
  const detailsData = (useLocation() as any).state;
  return (
    <div>
      <WjEditor editorId={detailsData?.editorId} />
    </div>
  );
};

export default Index;
