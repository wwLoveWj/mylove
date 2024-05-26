import { useTimeout } from "ahooks";
import React from "react";

interface PageLoadingpropsType {
  /** 延时显示 */
  delay?: number;
}

const PageLoading: React.FC<PageLoadingpropsType> = (props) => {
  const { delay = 300 } = props;
  const [loading, setLoading] = React.useState<boolean>(false);

  useTimeout(() => {
    setLoading(true);
  }, delay);
  return loading ? (
    <div className="custom-page-loading-container">
      <div className="custom-page-loading">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  ) : null;
};

export default PageLoading;
