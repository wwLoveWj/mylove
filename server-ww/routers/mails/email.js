const { createTransport, createTestAccount } = require("nodemailer");
const yaml = require("js-yaml");
const path = require("path");
const fs = require("fs");
const mail = yaml.load(
  fs.readFileSync(
    path.join(__dirname, "../../utils/mail/setting.yaml"),
    "utf-8"
  )
);

const sendMail = async ({ to, subject, html }) => {
  // 如果你没有一个真实邮箱的话可以使用该方法创建一个测试邮箱
  let testAccount = await createTestAccount();
  console.log(testAccount, "测试账户");
  const transporter = createTransport({
    //   host: "smtp.qq.com", // smtp服务的域名
    //   port: 587, // smtp服务的端口
    //   secure: false,
    // host: "smtp.163.com",
    // port: 465,
    // secure: true,
    ...testAccount?.pop3,
    auth: {
      user: testAccount?.user || mail[0]?.user || process.env.EMAIL_USER, // 你的邮箱地址
      pass: testAccount?.pass || mail[0]?.pass || process.env.EMAIL_PASS, // 你的授权码
    },
  });
  await transporter.sendMail({
    from: {
      name: "最爱你的老公",
      address: testAccount?.user || mail[0]?.user || process.env.EMAIL_USER, // 你的邮箱地址
    },
    to,
    subject,
    html,
  });
};

module.exports = {
  sendMail,
};
