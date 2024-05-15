import Exception from "@/components/Exception";
import React from "react";
import { Link } from "umi";

const Exception404 = () => {
  return (
    <Exception
      type="404"
      linkElement={Link}
      redirect="/user-integral/integral-table"
    />
  );
};

export default Exception404;
