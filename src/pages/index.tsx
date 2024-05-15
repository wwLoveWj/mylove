import React from "react";
import { history, useIntl } from "umi";
import "./style.less";

export default function HomePage() {
  const intl = useIntl();
  const lang = intl.locale;
  const t = (id: string) => intl.formatMessage({ id }); // 写成传参方式
  // 根据语言对div样式进行更换
  const homeTitle = lang === "en-US" ? "english-title" : "chinese-title";
  return (
    <div>
      <div className={homeTitle}>{intl.formatMessage({ id: "chinese" })}</div>
      <h2>Yay! Welcome to umi!</h2>
      {/* <p>
        <img src={yayJpg} width="388" />
      </p> */}
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
      <div title={t("about.title")}>{t("about.title")}</div>
      <button
        onClick={() => {
          history.push("/good-manage/good-quantity");
        }}
      >
        跳转到user页面
      </button>
    </div>
  );
}
