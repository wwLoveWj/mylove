import { useState, useEffect } from "react";
import { Login } from "@/utils/request/api/user";
import useTranslation from "@/utils/hooks/useTranslate";
import { useIntl } from "umi";
import IconSvg from "@/components/IconSvg";

const DocsPage = () => {
  const $t = useTranslation();
  const intl = useIntl();
  // useEffect(() => {
  //   Login().then((res) => {
  //     localStorage.setItem("token", res.token);
  //   });
  // });
  return (
    <div>
      <p>This is umi docs.</p>
      <IconSvg type="clipboard" style={{ fontSize: "130px", color: "red" }} />
      <div>{$t("pages.docs.955138-0")}</div>
      <p>{$t("pages.docs.955138-1")}</p>
    </div>
  );
};

export default DocsPage;
