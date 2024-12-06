const express = require("express");
const yaml = require("js-yaml");
const path = require("path");
const fs = require("node:fs");
const _ = require("lodash");
const { sendMailFn } = require("../../utils");
const { mailInfoFn } = require("../../utils/config");
const db = require("../../utils/mysql");
const { camelCaseKeys } = require("../../utils");
const router = express.Router();

const mailYamlPath = path.join(__dirname, "../../utils/mail/setting.yaml");

// 邮件发送接口
router.post("/send", (req, res) => {
  let { to, text, subject, attachments, currentUser } = req.body;
  console.log(to, text, subject, "to, text, subject", currentUser);
  // let sendTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  const userInfo = mailInfoFn(currentUser);
  console.log(userInfo, "--------用户信息-----------");
  const options = {
    to,
    from: userInfo.user,
    subject, //主题
    text,
    // html: "<b>发送时间:" + sendTime + "</b>",
    attachments: [attachments],
  };
  sendMailFn(options, res, currentUser);
});

// 邮箱的授权码相关设置
router.post("/settings", (req, res) => {
  // let { pass, user, current } = req.body;
  const config = [{ ...req.body }];
  // _.defaultsDeep(mailInfo, config); //合并对象
  const yamlStr = yaml.dump([...config]); //转为yaml字符串
  console.log(yamlStr, "yamlStr----------------");
  // 写入相关文件中
  fs.writeFile(mailYamlPath, yamlStr, (err) => {
    if (err) throw err;
    res.send({
      code: 1,
      msg: "授权成功",
      data: null,
    });
  });
});

// 获取当前用户所有邮件
router.get("/query", (req, res) => {
  let params = req.query;
  // const sqlStr = `select * from task_info where task like '%${params.taskName || ""}%' and status=?`;
  const sql = `select * from task_info where reminder_email=?`;
  db.query(sql, params.currentEmail, (err, rows) => {
    if (err) {
      res.send({
        code: 0,
        msg: err.message,
        data: null,
      });
      return console.log(err.message);
    }
    // 查询数据成功
    rows = rows.map((item) => camelCaseKeys(item));
    console.log(rows, "998----------");
    res.send({
      code: 1,
      msg: "邮件信息查询成功！",
      data: { list: rows },
    });
  });
});
module.exports = router;
