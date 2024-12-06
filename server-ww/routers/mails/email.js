const { createTransport, createTestAccount } = require("nodemailer");
const db = require("../../utils/mysql");
const { camelCaseKeys } = require("../../utils");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

let configTempAll = {};
// 获取当前系统登录用户的邮箱配置
const getCurrentConfig = async () => {
  let res = await new Promise((resolve, reject) => {
    const sql = `select * from mail_config where enteruser=?`;
    db.query(sql, "blww885@163.com", async (err, rows) => {
      if (err) {
        reject({ err: err.message });
        return console.log(err.message);
      }
      // 查询邮箱配置成功
      rows = rows.map((item) => camelCaseKeys(item));
      const config = rows.find((item) => item?.enteruser === "blww885@163.com");
      resolve(config);
    });
  });
  return res;
};

/**
 * 邮件发送方法
 * @param {*} subject  发送主题
 * @param {*} to       发送给谁
 * @param {*} html     发送的模板格式
 */
const sendMail = async ({ to, subject, html }) => {
  const { host, port, secure, user, pass } = configTempAll;
  // 如果你没有一个真实邮箱的话可以使用该方法创建一个测试邮箱
  let testAccount = await createTestAccount();
  // console.log(testAccount, "测试账户");
  const transporter = createTransport({
    //   host: "smtp.qq.com", // smtp服务的域名
    //   port: 587, // smtp服务的端口
    //   secure: false,
    host,
    port,
    secure,
    // ...testAccount?.pop3,
    auth: {
      user, // 你的邮箱地址
      pass, // 你的授权码
    },
  });
  await transporter.sendMail({
    from: {
      name: configTempAll?.nickname || "系统",
      address: user, // 你的邮箱地址
    },
    to,
    subject,
    html,
  });
};

// 生成一个长度为 6 的随机字符串
const code = Math.random().toString().slice(2, 8);
const validity = 5; // 有效期5min
// ===============================邮箱模板配置=============================
// 定义邮件模板配置路径path
const tempList = [
  {
    value: "../../public/email.html",
    key: "TASK_TIMING_REMINDER",
    note: "老婆专属提醒模板",
  },
  {
    value: "../../public/code.html",
    key: "VERIFICATION_CODE_REMINDER",
    note: "验证码专属邮件模板",
    emailConfig: {
      code,
      validity,
    },
  },
  {
    value: "../../public/tempMail.html",
    key: "GOOD_NEWS_REMINDER",
    note: "系统消息专属邮件模板",
  },
];
/**
 * 获取到发送邮件的模板
 * @param {*} address  想发送的人
 */
const sendMailTemp = async (address, title = "定时提醒") => {
  // 请求接口拿到当前的邮件配置
  configTempAll = await getCurrentConfig();
  // 寻找到当前的模板
  let configTemp = tempList?.find(
    (item) => item.key === configTempAll?.configKey
  );
  // 读取 HTML 模板文件  ejs || html
  const htmlPath = path.join(__dirname, configTemp?.value);
  const emailTemplate = fs.readFileSync(htmlPath, "utf-8");
  //  拿到转换后的html数据模板
  const emailHtml = ejs.render(
    emailTemplate,
    configTempAll?.emailConfig
      ? JSON.parse(configTempAll?.emailConfig || `{}`)
      : configTemp?.emailConfig
  );
  // await this.redisService.set("/login", code, validity * 60);
  await sendMail({
    to: address,
    subject: title,
    html: emailHtml,
  });
  // 链接：https://juejin.cn/post/7299621996249366591
};

module.exports = {
  sendMailTemp,
  sendMail,
};
