//nodemailer.js
const nodemailer = require("nodemailer");
// const { mailConfig } = require("../config/index");
// const { user, pass } = mailConfig;
const express = require("express");
const {
  sendMailFn,
  htmlCode,
  mailInfo,
  failMsg,
  successTip,
} = require("../utils/mailConfig");
const client = require("./redisStore");

const router = express.Router();

// 生成六位随机验证码
function createCode() {
  return parseInt(Math.random() * 1000000);
  //  return String(Math.floor(Math.random() * 1000000)).padEnd(6, '0') //生成6位随机验证码
  // return 'xxxxxx'.replace(/[xy]/g, function (c) {
  // 	var r = (Math.random() * 16) | 0
  // 	var v = c == 'x' ? r : (r & 0x3) | 0x8
  // 	return v.toString(16)
  // })
}
//发送验证码邮件
router.post("/send", function (req, res) {
  let code = createCode(); //随机生成验证码
  const mail = req.body.mail; //请求携带的邮件
  console.log(mail, "mail---------------code", code);
  let mailOptions = {
    from: `发送方<${mailInfo.user}>`, // 发送方
    to: `接收方<${mail}>`, //接收者邮箱，多个邮箱用逗号间隔
    subject: `欢迎登录,你的验证码${code}`, // 标题
    html: htmlCode(code),
  };
  sendMailFn(mailOptions, res);
  //存入redis
  client.set(mail, code).then((res) => {
    console.log(mail, code, "redis-------------");
    //设置成功发送邮件
    sendMailFn(mailOptions, res);
    res.send(successTip());
  });
  client.expire(mail, 60); //设置过期时间 60s 前端六十秒可以重新获取
});

//通过验证码登录
router.post("/code/login", function (req, response) {
  /* 这里 用户名就是 邮件 密码就是code */
  const { mail, code } = req.body;
  client.get(mail).then((res) => {
    //从redis查询数据
    if (code == res) {
      console.log("验证成功");
      //do something
      // ...
      response.send(
        successTip({
          user: mail,
        })
      );
    } else {
      console.log("验证失败");
      response.send(failMsg("验证失败"));
    }
  });
});

// 原文链接：https://blog.csdn.net/qq_31754591/article/details/123991487
module.exports = router;
