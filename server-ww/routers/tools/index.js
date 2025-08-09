const { exec } = require("child_process");
const express = require("express");

const router = express.Router();
const shutdown = (command) => {
  console.log("将在一小时后关机~");
  exec(command);
};
// 定时关机
router.get("/shutdown", (req, res) => {
  console.log(req?.query?.command, "----------------------------------");
  shutdown(req?.query?.command);
  res.send({
    code: 1,
    msg: "操作成功！",
    data: null,
  });
});
// // 取消关机
// router.get("/shutdown", (req, res) => {
//   shutdown();
// });
// // 重启电脑
// router.get("/shutdown", (req, res) => {
//   shutdown();
// });
module.exports = router;
