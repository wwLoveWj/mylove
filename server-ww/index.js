const express = require("express");
const cors = require("cors");
const path = require("path");
//token解析中间件 一定要在路由之前配置解析 Token 的中间件
const expressJWT = require("express-jwt");
// 导入全局配置文件（里面有token的密钥）
const { jwtConfig } = require("./utils/config");
const { camelCaseKeys } = require("./utils");
const db = require("./utils/mysql");

// 将所有的路由接口按不同文件分类，自定义router模块
const scoreRouter = require("./routers/scores");
const userRouter = require("./routers/users/index.js");
const roleRouter = require("./routers/roles");
const articleRouter = require("./routers/article");
const reminderRouter = require("./routers/reminderTasks/index.js");
const tasksRouter = require("./routers/tasks/index.js");
const fileRouter = require("./routers/file.js");
const mailRouter = require("./routers/mails/index.js");
const linkRouter = require("./routers/link.js");
const loginRouter = require("./routers/login/index.js");
const registerRouter = require("./routers/login/register.js");
const excelRouter = require("./routers/excel/index.js");

const app = express();
app.use(cors());
// 用于解析JSON类型的请求体
app.use(express.json());
// 用于解析URLEncoded的请求体
app.use(express.urlencoded({ extended: true }));

// 挂载静态文件路径，让外部可以直接访问到服务器文件
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "upload")));

// 注册全局中间件  链式调用 unless 方法，接收一个配置对象，path 字段设置一个正则表达式，表示不需要 token 身份认证的路由前缀。
app.use(
  expressJWT
    .expressjwt({
      // 加密时设置的密钥
      secret: jwtConfig.jwtSecretKey,
      // 设置算法
      algorithms: ["HS256"],
      // 无token请求不进行解析，并且抛出异常
      // credentialsRequired: false
    })
    .unless({
      path: [
        {
          url: /^\/login\/.*/,
          methods: ["GET", "POST"],
        },
        // "/login/index",
        // "/login/register",
        "/imgOCR",
        "/mail/send",
        "/code/send",
        // "/article/query",
        // "/task/query",
        // "/task/create",
        // "/excel/import",
        // "/excel/export",
        // {
        //   url: /^\/excel\/.*/,
        //   methods: ["GET", "POST"],
        // },
      ],
    })
);

// 对路由进行分区划分
app.use("/userInfo", userRouter);
app.use("/auth", roleRouter);
app.use("/scoreInfo", scoreRouter);
app.use("/article", articleRouter);
app.use("/reminder", reminderRouter);
app.use("/task", tasksRouter);
app.use("/file", fileRouter);
app.use("/mail", mailRouter);
app.use("/login", loginRouter);
app.use("/code", registerRouter);
app.use("/link", linkRouter);
app.use("/excel", excelRouter);

// 错误中间件 当token失效时 返回信息
app.use((err, req, res, next) => {
  console.dir(err.code, "401", err);
  if (err.code === "credentials_required") {
    res.status(403).send({
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
  console.log("服务开启在3007端口~");
});
