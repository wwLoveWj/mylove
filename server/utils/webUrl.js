const dayjs = require("dayjs");
const crypto = require("crypto");
const APIKey = "xxx43434rerttrt";
const APISecret = "xxx";
const APPID = "434rererer";
const UID = "test";

const host = "spark-api.xf-yun.com";
const req_path = "/v1.1/chat";

const gmtDate =
  new Date().getTime() + (new Date().getTimezoneOffset() / 60) * 60 * 60 * 1000;
const date = dayjs(gmtDate).format("ddd[,] DD MMM YYYY HH:mm:ss [GMT]");

// 利用上方的date动态拼接生成字符串tmp
const tmp = `host: ${host}\ndate: ${date}\nGET ${req_path} HTTP/1.1`;

// 利用hmac-sha256算法结合APISecret对上一步的tmp签名，获得签名后的摘要tmp_sha
const tmp_sha = crypto.createHmac("sha256", APISecret).update(tmp).digest();

// 将上方的tmp_sha进行base64编码生成signature
const signature = tmp_sha.toString("base64");

// 利用上面生成的signature，拼接下方的字符串生成authorization_origin
const authorization_origin = `api_key="${APIKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;

// 最后再将上方的authorization_origin进行base64编码,生成最终的authorization
const authorization = Buffer.from(authorization_origin).toString("base64");

// 将鉴权参数组合成最终的键值对
const url = `wss://${host}${req_path}?authorization=${encodeURIComponent(authorization)}&date=${encodeURIComponent(date).replace(new RegExp("%20", "g"), "+")}&host=${encodeURIComponent(host)}`;

module.exports = url;
