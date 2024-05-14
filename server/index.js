const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
// 自定义router模块
const scoreRouter = require("./routers/score.js");
const userRouter = require("./routers/user.js");
const editorRouter = require("./routers/editor.js");

const app = express();
app.use(cors());
// 用于解析JSON类型的请求体
app.use(express.json());
// 用于解析URLEncoded的请求体
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "./public")));

// 对路由进行分区划分
app.use("/userInfo", userRouter);
app.use("/scoreInfo", scoreRouter);
app.use("/editor", editorRouter);

// 获取飞机选座模型svg
app.get("/setOthersUrlSvg", (req, res) => {
  const ROOT_PATH = "https://echarts.apache.org/examples";
  console.log("正在处理请求...");
  axios.get(ROOT_PATH + "/data/asset/geo/flight-seats.svg").then((resl) => {
    fs.writeFile("./public/airport.svg", resl.data, (err) => {
      if (err) res.send(err);
      res.send({
        message: "success write!",
      });
    });
  });
});
// 因为上面的网址经常拿不到请求，所以直接存入服务端再返回出去
app.get("/getOthersUrlSvg", (req, res) => {
  const svg = fs.readFileSync("./public/airport.svg");
  // 假设我们有一个Buffer对象，包含HTML内容
  // const Buffer = require("buffer").Buffer;
  // const buffer = Buffer.from(svg);
  // // 将Buffer转换为字符串
  // const htmlString = buffer.toString();
  res.send({
    code: 0,
    message: "success",
    data: {
      svg: svg.toString(),
    },
  });
});

// 获取硬币模型svg
app.get("/getMoneySvg", (req, res) => {
  fs.readFile("./server/public/money.html", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    res.setHeader("Content-type", "text/html;charset=utf-8"); // 解决乱码
    // 不报错就返回html 文件
    res.send({
      code: 0,
      message: "success",
      data: data.toString(),
    });
    // res.sendFile(__dirname + "/public/money.html");
  });
});

app.listen(3007, () => {
  console.log("服务开启在3007端口");
});
