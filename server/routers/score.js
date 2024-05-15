const express = require("express");
const db = require("../mysql");
const camelCaseKeys = require("../utils");

const router = express.Router();
// ==================================分数信息接口 ========================================
router.get("/", (req, res) => {
  try {
    // 查询 users 表中所有的数据
    const sqlStr = "select * from score_info";
    db.query(sqlStr, (err, rows) => {
      // 查询数据失败
      if (err) return console.log(err.message);
      // 查询数据成功
      rows = rows.map((item) => camelCaseKeys(item));
      console.log("分数列表查询成功");
      res.send({
        code: 1,
        msg: "success",
        data: rows,
      });
    });
  } catch (error) {
    res.json({ success: false, msg: error.message, code: 0 });
  }
});

router.post("/create", (req, res) => {
  let params = req.body;
  // 定义待执行的 SQL 语句，其中英文的 ? 表示占位符
  const sqlStr =
    "insert into score_info (score_id,user_id,username,deduction_score,deduction_reason,deduction_person,description,update_time,deduction_time,score) values (?,?,?,?,?,?,?,?,?,?)";
  //   const sqlUser = "update user_info set score=? where user_id=?";

  // 执行 SQL 语句，使用数组的形式，依次为 ? 占位符指定具体的值
  db.query(
    sqlStr,
    [
      params.scoreId,
      params.userId,
      params.username,
      params.deductionScore,
      params.deductionReason,
      params.deductionPerson,
      params.description,
      params.updateTime,
      params.deductionTime,
      params.score,
    ],
    (err, results) => {
      // 执行 SQL 语句失败了
      if (err) return console.log(err.message);
      // 可以通过 affectedRows 属性，来判断是否插入数据成功
      if (results.affectedRows === 1) {
        console.log("插入数据成功!");
        res.send({
          code: 1,
          msg: "分数信息新增成功",
          data: null,
        });
        // 等分数表插入成功后再去改分数
        // db.query(sqlUser, [params.score, params.userId], (err, results) => {
        //   if (err) return console.log(err.message);
        //   // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
        //   if (results.affectedRows === 1) {
        //     console.log("用户信息表更新成功");
        //     res.send({
        //       code: 1,
        //       msg: "success",
        //       data: null,
        //     });
        //   }
        // });
      }
    }
  );
});

router.post("/edit", (req, res) => {
  let params = req.body;
  const sqlUser =
    "update score_info set score=?, deduction_score=?, deduction_reason=?, description=?, update_time=? where score_id=?";
  db.query(
    sqlUser,
    [
      params.score,
      params.deductionScore,
      params.deductionReason,
      params.description,
      params.updateTime,
      params.scoreId,
    ],
    (err, results) => {
      if (err) return console.log(err.message);
      // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
      if (results.affectedRows === 1) {
        console.log("分数更新成功");
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
  const sqlStr = "delete from score_info where score_id=?";
  db.query(sqlStr, params.scoreId, (err, results) => {
    if (err) return console.log(err.message);
    // 注意：执行 delete 语句之后，结果也是一个对象，也会包含 affectedRows 属性
    if (results.affectedRows === 1) {
      console.log("删除数据成功");
      res.send({
        code: 1,
        msg: "删除数据成功",
        data: null,
      });
    }
  });
});

router.post("/details", (req, res) => {
  let params = req.body;
  const sqlStr = "select * from score_info where user_id=?";
  // "select * from score_info where user_id= <select user_id from user_info where user_id=?>";
  db.query(sqlStr, params.userId, (err, rows) => {
    if (err) return console.log(err.message);
    // 注意：执行 delete 语句之后，结果也是一个对象，也会包含 affectedRows 属性
    console.log("查询明细数据成功");
    rows = rows.map((item) => camelCaseKeys(item));
    res.send({
      code: 1,
      msg: "查询分数明细数据成功",
      data: rows,
    });
  });
});

module.exports = router;
