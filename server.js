const { exec } = require("child_process");
exec("redis-server", (error, stdout, stderr) => {
  if (error) {
    console.error(`执行的错误: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
