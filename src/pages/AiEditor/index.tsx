import React, { useEffect, useRef } from "react";
import { AiEditor } from "aieditor";
import * as base64 from "base-64";
import CryptoJs from "crypto-js";
import { getModelInfoAPI } from "@/utils/request/api/aiEditor";
import "aieditor/dist/style.css";

function App() {
  //Define Ref
  const divRef = useRef(null);
  // 鉴权url地址
  const getWebsocketUrl = (APISecret: string, APIKey: string) => {
    return new Promise((resovle, reject) => {
      let url = "wss://spark-api.xf-yun.com/v1.1/chat";
      let host = "spark-api.xf-yun.com";
      let apiKeyName = "api_key";
      let date = new Date().toGMTString();
      let algorithm = "hmac-sha256";
      let headers = "host date request-line";
      let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`;
      let signatureSha = CryptoJs.HmacSHA256(signatureOrigin, APISecret);
      let signature = CryptoJs.enc.Base64.stringify(signatureSha);

      let authorizationOrigin = `${apiKeyName}="${APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;

      let authorization = base64.encode(authorizationOrigin);

      // 将空格编码
      url = `${url}?authorization=${authorization}&date=${encodeURI(date)}&host=${host}`;

      resovle(url);
    });
  };
  //Initialization AiEditor
  useEffect(() => {
    if (divRef.current) {
      const aiEditor = new AiEditor({
        element: divRef.current,
        placeholder: "Click to Input Content...",
        content:
          "AiEditor is an Open Source Rich Text Editor Designed for AI. ",
        ai: {
          models: {
            spark: {
              appId: "xxxxx",
            },
          },
          bubblePanelEnable: true,
          bubblePanelModel: "spark",
          onCreateClientUrl: (modelName, modelConfig, startFn) => {
            //通过后端获取到 签名 url 后，执行 startFn 并传入 url。
            getModelInfoAPI({}).then(async ({ APISecret, APIKey }) => {
              const url: any = await getWebsocketUrl(APISecret, APIKey);
              startFn(url);
            });
          },
        },
      });

      return () => {
        aiEditor.destroy();
      };
    }
  }, []);

  return (
    <>
      <div>
        <h1>AiEditor， an Open Source Rich Text Editor Designed for AI</h1>
      </div>
      <div ref={divRef} style={{ height: "600px" }} />
    </>
  );
}

export default App;
