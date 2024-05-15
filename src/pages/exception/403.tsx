import Exception from "@/components/Exception";
import React from "react";
import { Link } from "umi";

const Exception403 = () => {
  return (
    <Exception
      type="403"
      linkElement={Link}
      redirect="/user-integral/integral-table"
    />
  );
};

export default Exception403;
