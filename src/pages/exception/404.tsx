import Exception from "@/components/Exception";
import { Link } from "umi";

const Exception404 = () => {
  return (
    <Exception
      type="404"
      linkElement={Link}
      redirect="/good-manage/good-quantity"
    />
  );
};

export default Exception404;
