const { spawn } = require("child_process");
const { exit } = require("process");
const fs = require("fs");
const path = require("path");
// const program = require("commander");
const child = spawn("node", ["../server.js"], { detached: true });
const log_file = path.join(__dirname, "log.txt");
fs.open(log_file, "a+", function name(err, fd) {
  fs.write(fd, child.pid + "\n", function () {});
  exit();
});
console.log(`✅任务创建成功,执行频率5s`);
// try {
//   const child = spawn("node", ["../server.js"], { detached: true });
//   //   child.stdout.on("data", (data) => {
//   //     console.log(`stdout: ${data}`);
//   //   });

//   //   child.stderr.on("data", (data) => {
//   //     console.error(`stderr: ${data}`);
//   //   });

//   //   child.on("close", (code) => {
//   //     console.log(`子进程退出，退出码 ${code}`);
//   //   });
//   const log_file = path.join(__dirname, "log.txt");
//   fs.open(log_file, "a+", function (err, fd) {
//     fs.write(fd, child.pid + "\n", function (rrrr) {
//       console.log(rrrr);
//     });
//     exit();
//   });
//   console.log(`✅任务创建成功,执行频率5s`);
// } catch (e) {
//   console.error("spawn ERROR !!");
//   console.error(e);
// }
