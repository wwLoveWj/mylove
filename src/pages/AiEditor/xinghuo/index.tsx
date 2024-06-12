import React, { useState, useRef } from "react";
import { Button } from "antd";
import { useRequest } from "ahooks";
import { getModelInfoAPI } from "@/utils/request/api/aiEditor";
import * as base64 from "base-64";
import CryptoJs from "crypto-js";
import "./style.less";

let sparkResult = "";
const Index = () => {
  const [question, setQuestion] = useState("");
  //   存储星火大模型相关权限数据
  const [allXinghuoModelInfo, setAllXinghuoModelInfo] = useState<
    Partial<{ APIKey: string; APISecret: string; APPID: string }>
  >({});
  //   写入回答的容器
  const resultRef = useRef(null);
  //   请求星火大模型相关权限数据的接口
  useRequest(() => getModelInfoAPI({}), {
    debounceWait: 100,
    onSuccess: (res: any) => {
      setAllXinghuoModelInfo(res);
    },
  });
  /** 将信息添加到textare中
    在textarea中不支持HTML标签。
    不能使用
    标签进行换行。
    也不能使用\r\n这样的转义字符。

    要使Textarea中的内容换行，可以使用&#13;或者&#10;来进行换行。
    &#13;表示回车符；&#10;表示换行符；
*/
  const addMsgToTextarea = (words: string) => {
    const result = document.getElementById("result") as Element;
    result.innerHTML = words;
    // (resultRef.current as any).innerHTML = text;
  };
  // 发送消息
  const sendMsg = async () => {
    // 获取请求地址
    const url: any = await getWebsocketUrl();
    // 每次发送问题 都是一个新的websocket请求
    const socket = new WebSocket(url);
    const { APPID } = allXinghuoModelInfo;
    // 监听websocket的各阶段事件 并做相应处理
    socket.addEventListener("open", (event) => {
      console.log("开启连接！！", event);
      // 发送消息
      let params = {
        header: {
          app_id: APPID,
          uid: "test",
        },
        parameter: {
          chat: {
            domain: "general",
            temperature: 0.5,
            max_tokens: 4096,
          },
        },
        payload: {
          message: {
            // 如果想获取结合上下文的回答，需要开发者每次将历史问答信息一起传给服务端，如下示例
            // 注意：text里面的所有content内容加一起的tokens需要控制在8192以内，开发者如有较长对话需求，需要适当裁剪历史信息
            text: [
              { role: "user", content: "你是谁" }, //# 用户的历史问题
              { role: "assistant", content: "我是AI助手" }, //# AI的历史回答结果
              // ....... 省略的历史对话
              { role: "user", content: question }, //# 最新的一条问题，如无需上下文，可只传最新一条问题
            ],
          },
        },
      };
      console.log("发送消息");
      socket.send(JSON.stringify(params));
    });
    socket.addEventListener("message", (event) => {
      let data = JSON.parse(event.data);
      // console.log('收到消息！！',data);
      sparkResult += data.payload.choices.text[0].content;
      if (data.header.code !== 0) {
        console.log("出错了", data.header.code, ":", data.header.message);
        // 出错了"手动关闭连接"
        socket.close();
      }
      if (data.header.code === 0) {
        // 对话已经完成
        if (data.payload.choices.text && data.header.status === 2) {
          sparkResult += data.payload.choices.text[0].content;
          setTimeout(() => {
            // "对话完成，手动关闭连接"
            socket.close();
          }, 1000);
        }
      }
      addMsgToTextarea(sparkResult);
    });
    socket.addEventListener("close", (event) => {
      console.log("连接关闭！！", event);
      // 对话完成后socket会关闭，将聊天记录换行处理
      sparkResult = sparkResult + "&#10;";
      addMsgToTextarea(sparkResult);
      // 清空输入框
      setQuestion("");
    });
    socket.addEventListener("error", (event) => {
      console.log("连接发送错误！！", event);
    });
  };
  // 鉴权url地址
  const getWebsocketUrl = () => {
    return new Promise((resovle, reject) => {
      const { APISecret, APIKey } = allXinghuoModelInfo;
      let url = "wss://spark-api.xf-yun.com/v1.1/chat";
      let host = "spark-api.xf-yun.com";
      let apiKeyName = "api_key";
      let date = (new Date() as any).toGMTString();
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
  return (
    <>
      <h1>讯飞星火认知大模型</h1>
      <div id="results">
        <div ref={resultRef} id="result"></div>
      </div>
      <div id="sendMsg">
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
        <Button id="btn" onClick={sendMsg}>
          发送信息
        </Button>
      </div>
    </>
  );
};

export default Index;
