const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// 请求用户信息
app.get("/api/usersInfo", (req, res) => {
  res.send({
    username: "ww",
    age: 18,
    profession: "Frontend programmers",
  });
});

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
app.listen(3007, () => {
  console.log("服务开启在3007端口");
});
