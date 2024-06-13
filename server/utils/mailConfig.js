const nodemailer = require("nodemailer");
const yaml = require("js-yaml");
const path = require("path");
const fs = require("node:fs");

const mailInfo = yaml.load(
  fs.readFileSync(path.join(__dirname, "../mail/mail.yaml"), "utf-8")
);
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
    user: mailInfo.user, //邮箱
    pass: mailInfo.pass, //密码|授权码
  },
});
// 邮箱验证码的格式
const htmlCode = (code) => {
  return `<head>
    <base target="_blank" />
    <style type="text/css">
        ::-webkit-scrollbar{ display: none; }
    </style>
    <style id="cloudAttachStyle" type="text/css">
        #divNeteaseBigAttach, 
        #divNeteaseBigAttach_bak{
            display:none;
        }
    </style>
    <style id="blockquoteStyle" type="text/css">
        blockquote{
            display:none;
        }
    </style>
    <style type="text/css">
        body{
            font-size:14px;
            font-family:arial,verdana,sans-serif;
            line-height:1.666;
            padding:0;
            margin:0;
            overflow:auto;
            white-space:normal;
            word-wrap:break-word;
            min-height:100px
        }  
        td, input, button, select, body{
            font-family:Helvetica, \'Microsoft Yahei\', verdana
        }  
        pre {
            white-space:pre-wrap;
            white-space:-moz-pre-wrap;
            white-space:-pre-wrap;
            white-space:-o-pre-wrap;
            word-wrap:break-word;
            width:95%
        }  
        th,td{
            font-family:arial,verdana,sans-serif;
            line-height:1.666
        } 
        img{
            border:0
        }  
        header,footer,section,aside,article,nav,hgroup,figure,figcaption{
            display:block
        }  
        blockquote{
            margin-right:0px
        }
    </style>
</head>
<body tabindex="0" role="listitem">
  <table width="700" border="0" align="center" cellspacing="0" style="width:700px;">
    <tbody>
        <tr>
         <td>
            <div style="width:700px;margin:0 auto;border-bottom:1px solid #ccc;margin-bottom:30px;">
                <table border="0" cellpadding="0" cellspacing="0" width="700" height="39" style="font:12px Tahoma, Arial, 宋体;">
                    <tbody>
                        <tr>
                        <td width="210"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style="width:680px;padding:0 10px;margin:0 auto;">
            <div style="line-height:1.5;font-size:14px;margin-bottom:25px;color:#4d4d4d;">
                <strong style="display:block;margin-bottom:15px;">
                    尊敬的用户：<span style="color:#f60;font-size: 16px;"></span>
                    您好！</strong><strong style="display:block;margin-bottom:15px;">
                    您正在进行<span style="color: red">用户登录</span>操作，
                    请在验证码输入框中输入：<span style="color:#f60;font-size: 24px">${code}</span>
                    ，以完成操作。
                </strong>
            </div>
            <div style="margin-bottom:30px;">
                <small style="display:block;margin-bottom:20px;font-size:12px;">
                <p style="color:#747474;">
                    注意：此操作可能会修改您的密码、登录邮箱或绑定手机。如非本人操作，
                    请及时登录并修改密码以保证帐户安全<br>（工作人员不会向你索取此验证码，请勿泄漏！)
                </p></small></div></div><div style="width:700px;margin:0 auto;">
            <div style="padding:10px 10px 0;border-top:1px solid #ccc;color:#747474;margin-bottom:20px;line-height:1.3em;font-size:12px;">
            <p>此为系统邮件，请勿回复<br>请保管好您的邮箱，避免账号被他人盗用</p>
            <p>网络科技团队</p></div></div>
         </td>
        </tr>
    </tbody>
  </table>
</body>`;
};

//成功返回参数
function successTip(res, total = null) {
  if (total) {
    return {
      code: 1,
      data: res,
      msg: "验证码发送成功",
      total,
    };
  } else {
    return {
      code: 1,
      data: res,
      msg: "验证码发送成功",
    };
  }
}
//失败参数
function failMsg(msg) {
  return {
    code: 0,
    msg,
  };
}
/**
 * @description 发送邮件函数
 * @param options 邮件发送配置
 *  let sendTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
 *  {
 *      to：`收件人<${mailInfo.to}>`,//发送给谁
        from: `发送方<${mailInfo.user}>`,,
        subject, //主题
        text,//正文
        // html内容，支持dom结构
        // html: "<b>发送时间:" + sendTime + "</b>",
        // 附件内容 是一个列表, 可以是package.json文件, 头像, zip包
        attachments: attachments
        ? [
            {
              filename: "package.json",
              path: path.resolve(__dirname, "package.json"),
            },
            {
              filename: "666.png",
              path: path.resolve(
                __dirname,
                "../upload/5604a827d4ba51cbcb8c87599411c274.png"
              ),
            },
            {
              filename: "room.zip",
              path: path.resolve(__dirname, "room.zip"),
            },
            {
                ...attachments,
            },
          ]
        : null
    }
 * @param res 接口响应配置
 */
function sendMailFn(options, res) {
  transporter.sendMail(options, (error, info) => {
    if (error) {
      res.send({
        code: 0,
        msg: err.message,
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

module.exports = {
  sendMailFn,
  mailInfo,
  transporter,
  htmlCode,
  successTip,
  failMsg,
};
