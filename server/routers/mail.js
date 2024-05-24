const express = require("express");
const nodemailer = require("nodemailer");
const yaml = require("js-yaml");
const path = require("path");
// const http = require("node:http");
const fs = require("node:fs");
// const url = require("node:url");
// const db = require("../mysql");
// const camelCaseKeys = require("../utils");
const mailInfo = yaml.load(
  fs.readFileSync(path.join(__dirname, "../mail/mail.yaml"), "utf-8")
);
console.log(mailInfo, "mailInfo-------");

const router = express.Router();
// 首先初始化一下邮件服务
const transport = nodemailer.createTransport({
  service: "qq", //服务商
  auth: {
    host: "smtp.qq.com",
    port: 465,
    secure: true, //是否开启https
    user: mailInfo.user, //邮箱
    pass: mailInfo.pass, //密码|授权码
  },
});
router.post("/send", (req, res) => {
  let { to, text, subject } = req.body;
  console.log(to, text, subject, "to, text, subject");
  transport.sendMail({
    to,
    from: mailInfo.user,
    subject, //主题
    text,
  });
});

module.exports = router;
