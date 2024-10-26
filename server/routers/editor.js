const express = require("express");
const db = require("../mysql");
const camelCaseKeys = require("../utils");
const client = require("./redisStore");
const router = express.Router();
// ==============================编辑器内容的读取和设置================================
router.get("/getEditorTable", (req, res) => {
  const sqlStr = "select * from editor_info";
  db.query(sqlStr, (err, rows) => {
    // 查询数据失败
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
    res.send({
      code: 1,
      msg: "编辑信息查询成功！",
      data: rows,
    });
  });
});
router.post("/getEditorHtml", (req, res) => {
  let params = req.body;
  const sqlStr = "select * from editor_info where editor_id=?";
  db.query(sqlStr, params.editorId, (err, rows) => {
    // 查询数据失败
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
    res.send({
      code: 1,
      msg: "编辑信息查询成功！",
      data: rows,
    });
  });
});
router.post("/setEditorHtml", (req, res) => {
  // 向 users 表中，新增一条数据，其中 username 的值为 Spider-Man，password 的值为 pcc123
  let { editorContent, editorId, title } = req.body;
  client.get(editorContent).then((info) => {
    console.log(editorContent, "editorContent---------", info);
    // 定义待执行的 SQL 语句，其中英文的 ? 表示占位符
    const sqlStr =
      "insert into editor_info (editor_content,editor_id,title) values (?,?,?)";
    // 执行 SQL 语句，使用数组的形式，依次为 ? 占位符指定具体的值
    db.query(sqlStr, [info, editorId, title], (err, results) => {
      if (err) {
        res.send({
          code: 0,
          msg: err.message,
          data: null,
        });
        return console.log(err.message);
      }
      if (results.affectedRows === 1) {
        console.log("文章更新成功！");
        res.send({
          code: 1,
          msg: "文章更新成功！",
          data: null,
        });
      }
    });
  });
});

router.post("/delete", (req, res) => {
  let params = req.body;
  const sqlStr = "delete from editor_info where editor_id=?";
  db.query(sqlStr, params.editorId, (err, results) => {
    if (err) {
      res.send({
        code: 0,
        msg: err.message,
        data: null,
      });
      return console.log(err.message);
    }
    if (results.affectedRows === 1) {
      console.log("删除文章列表数据成功");
      res.send({
        code: 1,
        msg: "删除文章列表数据成功",
        data: null,
      });
    }
  });
});
module.exports = router;
