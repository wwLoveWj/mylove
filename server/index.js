const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const db = require("./mysql");
const camelCaseKeys = require("./utils");
//token解析中间件 一定要在路由之前配置解析 Token 的中间件
const expressJWT = require("express-jwt");
// 导入全局配置文件（里面有token的密钥）
const config = require("./utils/config");
const singleThreadOCR = require("./singleThread_js/singleThread");

// 自定义router模块
const scoreRouter = require("./routers/score.js");
const userRouter = require("./routers/user.js");
const editorRouter = require("./routers/editor.js");
const loginRouter = require("./routers/login.js");
const mailRouter = require("./routers/mail.js");
const fileRouter = require("./routers/file.js");
const registerRouter = require("./routers/register.js");
const app = express();

app.use(cors());
// 用于解析JSON类型的请求体
app.use(express.json());
// 用于解析URLEncoded的请求体
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "upload")));
// 注册全局中间件  链式调用 unless 方法，接收一个配置对象，path 字段设置一个正则表达式，表示不需要 token 身份认证的路由前缀。
app.use(
  expressJWT
    .expressjwt({
      // 加密时设置的密钥
      secret: config.jwtSecretKey,
      // 设置算法
      algorithms: ["HS256"],
      // 无token请求不进行解析，并且抛出异常
      // credentialsRequired: false
    })
    .unless({
      path: [
        "/login/index",
        "/login/register",
        "/imgOCR",
        "/mail/send",
        "/api/getModelInfo",
        "/code/send",
        {
          url: /^\/public\/.*/,
          methods: ["GET", "POST"],
        },
      ],
      // path: ['/users/login','/users']
    })
);

// 对路由进行分区划分
app.use("/userInfo", userRouter);
app.use("/scoreInfo", scoreRouter);
app.use("/editor", editorRouter);
app.use("/login", loginRouter);
app.use("/mail", mailRouter);
app.use("/file", fileRouter);
app.use("/code", registerRouter);

// 错误中间件 当token失效时 返回信息
app.use((err, req, res, next) => {
  console.dir(err.code, "401", err);
  if (err.code === "credentials_required") {
    res.status(401).send({
      code: 0,
      data: null,
      msg: "身份认证失败！",
    });
  } else if (err.code === "invalid_token") {
    res.status(401).send({
      code: 0,
      data: null,
      msg: "登录过期，请重新登录！",
    });
  }
});

// 获取飞机选座模型svg
app.get("/setOthersUrlSvg", (req, res) => {
  const ROOT_PATH = "https://echarts.apache.org/examples";
  console.log("正在处理请求...");
  axios.get(ROOT_PATH + "/data/asset/geo/flight-seats.svg").then((resl) => {
    fs.writeFile("./public/airport.svg", resl.data, (err) => {
      if (err) res.send(err);
      res.send({
        code: 1,
        msg: "success write!",
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
    code: 1,
    msg: "success",
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
      code: 1,
      msg: "success",
      data: data.toString(),
    });
    // res.sendFile(__dirname + "/public/money.html");
  });
});

// 通过ocr技术识别图片文字
app.post("/imgOCR", async (req, res) => {
  const { imgUrl } = req.body;
  console.log(req.body?.imgUrl, "------url参数------");
  const filePath = await singleThreadOCR({
    // targetPhotoDir: path.join(__dirname, "./singleThread_js/images/ocr.png"),
    targetPhotoDir: imgUrl,
    languages: "chi_sim+eng",
    targetPath: path.join(__dirname, "./upload/"),
  });
  console.log(filePath, "-------生成的文件路径--------");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) throw err;
    res.send({
      code: 1,
      msg: "success",
      data,
    });
  });
});

// 获取讯飞星火大模型的签名url
app.get("/api/getModelInfo", (req, res) => {
  const sqlStr = "select * from api_info";
  db.query(sqlStr, (err, rows) => {
    if (err) return console.log(err.message);
    rows = rows.map((item) => camelCaseKeys(item));
    const { apiKey, apiSecret, appId } = rows[0];
    res.send({
      code: 1,
      msg: "success",
      data: {
        APIKey: apiKey,
        APISecret: apiSecret,
        APPID: appId,
      },
    });
  });
});
app.listen(3007, () => {
  console.log("服务开启在3007端口");
});
