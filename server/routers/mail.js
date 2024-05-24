const express = require("express");
const nodemailer = require("nodemailer");
const yaml = require("js-yaml");
const path = require("path");
// const http = require("node:http");
const fs = require("node:fs");
const dayjs = require("dayjs");
// const url = require("node:url");
// const db = require("../mysql");
// const camelCaseKeys = require("../utils");
const mailInfo = yaml.load(
  fs.readFileSync(path.join(__dirname, "../mail/mail.yaml"), "utf-8")
);

const router = express.Router();
// 首先初始化一下邮件服务
const transport = nodemailer.createTransport({
  // service: "qq", //服务商
  host: "smtp.163.com", //qq的为"smtp.qq.com"
  port: 465,
  secure: true, //是否开启https
  auth: {
    user: mailInfo.user, //邮箱
    pass: mailInfo.pass, //密码|授权码
  },
});
router.post("/send", (req, res) => {
  let { to, text, subject, attachments } = req.body;
  console.log(to, text, subject, "to, text, subject");
  let sendTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  transport.sendMail(
    {
      to,
      from: mailInfo.user,
      subject, //主题
      text,
      // html内容
      html: "<b>发送时间:" + sendTime + "</b>",
      // 附件内容 是一个列表, 可以是package.json文件, 头像, zip包
      attachments: [
        // {
        //   filename: "package.json",
        //   path: path.resolve(__dirname, "package.json"),
        // },
        // {
        //   filename: "666.png",
        //   path: path.resolve(
        //     __dirname,
        //     "../upload/5604a827d4ba51cbcb8c87599411c274.png"
        //   ),
        // },
        // {
        //   filename: "room.zip",
        //   path: path.resolve(__dirname, "room.zip"),
        // },
        {
          ...attachments,
        },
      ],
    },
    (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("邮件发送成功~", info);
      res.send({
        code: 1,
        msg: "邮件发送成功~",
        data: null,
      });
    }
  );
});

module.exports = router;
