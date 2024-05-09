import Exception from "@/components/Exception";
import { Link } from "umi";

const Exception403 = () => {
  return (
    <Exception
      type="403"
      linkElement={Link}
      redirect="/good-manage/good-quantity"
    />
  );
};

export default Exception403;
