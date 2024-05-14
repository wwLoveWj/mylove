// server.js
const WebSocket = require("ws");
const db = require("./mysql");
const camelCaseKeys = require("./utils");

const wss = new WebSocket.Server({ port: 8080 });

// 更新数据
const updateData = (data, ws) => {
  const sqlStr = "update editor_info set editor_content=?";
  db.query(sqlStr, [data], (err, results) => {
    if (err) {
      return console.log(err.message);
    }
    if (results.affectedRows === 1) {
      console.log("修改数据成功! %s", data);
      ws.send("数据编辑成功！");
    }
  });
};
// 插入数据
const addData = (data, ws) => {
  // 定义待执行的 SQL 语句，其中英文的 ? 表示占位符
  const sqlStr = "insert into editor_info (editor_content) values (?)";
  db.query(sqlStr, [data], (err, results) => {
    if (err) {
      return console.log(err.message);
    }
    if (results.affectedRows === 1) {
      console.log("插入数据成功! %s", data);
      ws.send("数据编辑成功！");
    }
  });
};
wss.on("connection", function connection(ws) {
  //   ws.on("pong", function () {
  //     // 收到客户端响应，心跳检测成功
  //     console.log("Pong received.");
  //   });
  ws.on("message", function incoming(data) {
    console.log(data.toString(), "-----我是传送过来的数据--------");
    if (data.toString() === "heartbeat") {
      // 心跳应答
      ws.send(data.toString());
      return;
    }
    // 查询editor_info中的数据
    db.query("select editor_content from editor_info", [data], (err, rows) => {
      if (err) {
        return console.log(err.message);
      }
      //   判断查询到的数据存不存在，有就更新，没有就创建
      rows = rows.map((item) => camelCaseKeys(item));
      console.log(rows, "数据库中的内容");
      if (!rows?.length) {
        addData(data, ws);
      } else {
        updateData(data, ws);
      }
    });
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
