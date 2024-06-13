const express = require("express");
const yaml = require("js-yaml");
const path = require("path");
const fs = require("node:fs");
const _ = require("lodash");

const nodemailer = require("nodemailer");
// const { mailInfo, sendMailFn } = require("../utils/mailConfig");
const router = express.Router();
const mailInfo = yaml.load(
  fs.readFileSync(path.join(__dirname, "../mail/setting.yaml"), "utf-8")
);
function sendMailFn(options, res, transporter) {
  transporter.sendMail(options, (error, info) => {
    if (error) {
      res.send({
        code: 0,
        msg: error.message,
        data: null,
      });
      return console.log(error);
    }
    console.log("邮件发送成功~", info.response);
    res.send({
      code: 1,
      msg: "邮件发送成功~",
      data: null,
    });
  });
}
router.post("/send", (req, res) => {
  let { to, text, subject, attachments, currentUser } = req.body;
  console.log(to, text, subject, "to, text, subject", currentUser);
  // let sendTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

  const userInfo = mailInfo.find((item) => item.current === currentUser);
  console.log(userInfo, "mm---------用户信息", mailInfo);
  const options = {
    to,
    from: userInfo.user,
    subject, //主题
    text,
    // html: "<b>发送时间:" + sendTime + "</b>",
    attachments: attachments
      ? [
          {
            ...attachments,
          },
        ]
      : null,
  };
  // 首先初始化一下邮件服务
  const transporter = nodemailer.createTransport({
    //node_modules/nodemailer/lib/well-known/services.json  查看相关的配置，如果使用qq邮箱，就查看qq邮箱的相关配置
    // service: "qq", //服务商
    host: "smtp.163.com", //qq的为"smtp.qq.com"
    port: 465,
    secure: true, //是否开启https // true for 465, false for other ports
    //pass 不是邮箱账户的密码而是stmp的授权码（必须是相应邮箱的stmp授权码）
    //邮箱---设置--账户--POP3/SMTP服务---开启---获取stmp授权码
    auth: {
      user: userInfo.user, //邮箱
      pass: userInfo.pass, //密码|授权码
    },
  });
  sendMailFn(options, res, transporter);
});

router.post("/settings", (req, res) => {
  let { pass, user } = req.body;
  const config = [{ pass, user, current: "blww" }];
  // _.defaultsDeep(mailInfo, config); //合并对象
  // console.log(mailInfo, "llo---------");
  const yamlStr = yaml.dump([...config]); //转为yaml字符串
  console.log(yamlStr, "yamlStr----------------");
  fs.writeFile(path.join(__dirname, "../mail/setting.yaml"), yamlStr, (err) => {
    if (err) throw err;
    res.send({
      code: 1,
      msg: "授权成功",
      data: null,
    });
  });
});
module.exports = router;
