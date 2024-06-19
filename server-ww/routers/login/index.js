const express = require("express");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
// const bcrypt = require("bcryptjs");
const db = require("../../utils/mysql");
// 导入全局配置文件（里面有token的密钥）
const { jwtConfig } = require("../../utils/config");

const router = express.Router();
/**
 * POST 用户注册
 * @param username  用户名
 * @param password  用户密码
 */
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.send({
      code: 0,
      msg: "用户名与密码为必传参数...",
    });
    return;
  }
  if (username && password) {
    const searchSql = `SELECT * FROM login_info WHERE username=?`;
    db.query(searchSql, [username], (err, results) => {
      if (err) throw err;
      if (results.length >= 1) {
        //2、如果有相同用户名，则注册失败，用户名重复
        res.send({ code: 0, msg: "注册失败，用户名重复" });
      } else {
        // 调用 bcrypt.hashSync() 对密码加密
        // let pwd = bcrypt.hashSync(password, 10); // 参数2： 加密等级 填10即可
        const sqlStr = "insert into login_info (username,password) values(?,?)";
        db.query(sqlStr, [username, password], (err, results) => {
          if (err) throw err;
          if (results.affectedRows === 1) {
            res.send({ code: 1, msg: "注册成功" });
          } else {
            res.send({ code: 0, msg: "注册失败" });
          }
        });
      }
    });
  }
  console.log("注册接收", req.body);
});

/**
 * 登录接口
 */
router.post("/index", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.send({
      code: 0,
      msg: "用户名与密码为必传参数...",
    });
    return;
  }
  const sqlStr = "select * from login_info WHERE username=? And password=?";
  db.query(sqlStr, [username, password], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      // 生成token
      var token = jwt.sign(
        {
          identity: result[0].identity,
          username: result[0].username,
        },
        jwtConfig.jwtSecretKey,
        {
          expiresIn: jwtConfig.expiresIn, //tonken 有效期
        }
      );
      console.log("token返回成功！");
      res.send({ code: 1, msg: "登录成功", data: { username, token } });
      // 如果没有登录成功，则返回登录失败
    } else {
      //   let authorization = req.headers.authorization;
      //   // 判断token
      //   if (!authorization) {
      //     res.send({ code: 0, msg: "未登录" });
      //   } else {
      //     console.log(authorization, "authorization---------登陆校验");
      //     let token = authorization.split(" ")[1]; // 获取token
      //     console.log(token, "authorization---------过期了？");
      //     jwt.verify(token, "secret", (err, decode) => {
      //       if (err) {
      //         res.send({ code: 0, msg: "登录过期，请重新登录！" });
      //       }
      //     });
      //   }
      res.send({ code: 0, msg: "用户名或密码错误！" });
    }
  });
});
module.exports = router;
