const express = require("express");
const db = require("../mysql");
const camelCaseKeys = require("../utils");

const router = express.Router();
// ==============================编辑器内容的读取和设置================================
router.get("/getEditorHtml", async (req, res) => {
  const sqlStr = "select * from editor_info";
  await db.query(sqlStr, (err, rows) => {
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
  let editor = req.body;
  // 定义待执行的 SQL 语句，其中英文的 ? 表示占位符
  const sqlStr =
    "insert into editor_info (editor_content,editor_id) values (?,?)";
  // 执行 SQL 语句，使用数组的形式，依次为 ? 占位符指定具体的值
  db.query(sqlStr, [editor.editorContent, editor.editorId], (err, results) => {
    if (err) {
      res.send({
        code: 0,
        msg: err.message,
        data: null,
      });
      return console.log(err.message);
    }
    if (results.affectedRows === 1) {
      console.log("插入数据成功!", results);
      res.send({
        code: 1,
        msg: "保存成功！",
        data: null,
      });
    }
  });
});

module.exports = router;
