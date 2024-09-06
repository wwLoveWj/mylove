const express = require("express");
const db = require("../../utils/mysql");
const { camelCaseKeys, handleQueryDb } = require("../../utils");

const router = express.Router();
//================================  获取所有用户信息  ===========================
const searchUser = (res) => {
  // 查询 users 表中所有的数据
  const sqlStr = "select * from user_info";
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
    // 注意：如果执行的是 select 查询语句，则执行的结果是数组
    rows = rows.map((item) => camelCaseKeys(item));
    res.send({
      code: 1,
      msg: "用户信息查询成功！",
      data: rows,
    });
  });
};
/**
 * 查询用户信息数据
 */
router.get("/", (req, res) => {
  try {
    searchUser(res);
  } catch (error) {
    res.json({ success: false, msg: error.message, code: 0 });
  }
});
/**
 * 创建用户接口
 */
router.post("/create", (req, res) => {
  let params = req.body;
  // 定义待执行的 SQL 语句，其中英文的 ? 表示占位符
  const sqlStr =
    "insert into user_info (user_id,username, age,weight,score,status,description,email) values (?, ?,?,?,?,?,?,?)";
  // 执行 SQL 语句，使用数组的形式，依次为 ? 占位符指定具体的值
  handleQueryDb(
    sqlStr,
    [
      params.userId,
      params.username,
      params.age,
      params.weight,
      params.score,
      params.status,
      params.description,
      params.email,
    ],
    res,
    "用户信息新增成功~"
  );
});
/**
 * 更新用户接口
 */
router.post("/edit", (req, res) => {
  let params = req.body;
  const sqlStr =
    "update user_info set username=?, age=?, weight=?, score=?, status=?, description=?, email=? where user_id=?";
  handleQueryDb(
    sqlStr,
    [
      params.username,
      params.age,
      params.weight,
      params.score,
      params.status,
      params.description,
      params.userId,
      params.email,
    ],
    res,
    "用户信息更新成功~"
  );
});
/**
 * 删除用户接口
 */
router.post("/delete", (req, res) => {
  let params = req.body;
  const sqlStr = "delete from user_info where user_id=?";
  handleQueryDb(sqlStr, params.userId, res, "用户信息删除成功~");
});

// 5. 导出路由模块
module.exports = router;
