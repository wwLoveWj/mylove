const express = require("express");
const db = require("../mysql");
const camelCaseKeys = require("../utils");

const router = express.Router();
// ==============================编辑器内容的读取和设置================================
router.get("/query", (req, res) => {
  const sqlStr = "select * from link_info";
  db.query(sqlStr, (err, rows) => {
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
      msg: "网址信息查询成功！",
      data: rows,
    });
  });
});

router.post("/create", (req, res) => {
  let params = req.body;
  console.log(params, "网址新增参数");
  const sqlStr =
    "insert into link_info (name,description,link,avatar,link_id) values (?,?,?,?,?)";
  db.query(
    sqlStr,
    [
      params.name,
      params.description,
      params.link,
      params.avatar,
      params.linkId,
    ],
    (err, results) => {
      // 执行 SQL 语句失败了
      if (err) return console.log(err.message);
      // 可以通过 affectedRows 属性，来判断是否插入数据成功
      if (results.affectedRows === 1) {
        console.log("网址信息插入成功!");
        res.send({
          code: 1,
          msg: "网址信息插入成功~",
          data: null,
        });
      }
    }
  );
});

router.post("/edit", (req, res) => {
  let params = req.body;
  const sqlUser =
    "update link_info set name=?, description=?, link=?, avatar=? where link_id=?";
  db.query(
    sqlUser,
    [
      params.name,
      params.description,
      params.link,
      params.avatar,
      params.linkId,
    ],
    (err, results) => {
      if (err) return console.log(err.message);
      // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
      if (results.affectedRows === 1) {
        console.log("网址信息更新成功");
        res.send({
          code: 1,
          msg: "success",
          data: null,
        });
      }
    }
  );
});

router.post("/delete", (req, res) => {
  let params = req.body;
  const sqlStr = "delete from link_info where link_id=?";
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
      console.log("网址信息删除成功");
      res.send({
        code: 1,
        msg: "网址信息删除成功",
        data: null,
      });
    }
  });
});
module.exports = router;
