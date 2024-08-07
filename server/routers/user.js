const express = require("express");
const db = require("../mysql");
const camelCaseKeys = require("../utils");

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
  // 向 users 表中，新增一条数据，其中 username 的值为 Spider-Man，password 的值为 pcc123
  let params = req.body;
  // 定义待执行的 SQL 语句，其中英文的 ? 表示占位符
  const sqlStr =
    "insert into user_info (user_id,username, age,weight,score,status,description,email) values (?, ?,?,?,?,?,?,?)";
  // 执行 SQL 语句，使用数组的形式，依次为 ? 占位符指定具体的值
  db.query(
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
    (err, results) => {
      if (err) {
        res.send({
          code: 0,
          msg: err.message,
          data: null,
        });
        return console.log(err.message);
      }
      // 成功了
      // 注意：如果执行的是 insert into 插入语句，则 results 是一个对象
      // 可以通过 affectedRows 属性，来判断是否插入数据成功
      if (results.affectedRows === 1) {
        console.log("插入数据成功!");
        res.send({
          code: 1,
          msg: "用户信息新增成功！",
          data: null,
        });
      }
    }
  );
});
/**
 * 更新用户接口
 */
router.post("/edit", (req, res) => {
  let params = req.body;
  const sqlUser =
    "update user_info set username=?, age=?, weight=?, score=?, status=?, description=?, email=? where user_id=?";
  db.query(
    sqlUser,
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
    (err, results) => {
      if (err) {
        res.send({
          code: 0,
          msg: err.message,
          data: null,
        });
        return console.log(err.message);
      }
      // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
      if (results.affectedRows === 1) {
        console.log("用户信息更新成功");
        res.send({
          code: 1,
          msg: "用户信息更新成功！",
          data: null,
        });
      }
    }
  );
});
/**
 * 删除用户接口
 */
router.post("/delete", (req, res) => {
  let params = req.body;
  const sqlStr = "delete from user_info where user_id=?";
  db.query(sqlStr, params.userId, (err, results) => {
    if (err) {
      res.send({
        code: 0,
        msg: err.message,
        data: null,
      });
      return console.log(err.message);
    }
    // 注意：执行 delete 语句之后，结果也是一个对象，也会包含 affectedRows 属性
    if (results.affectedRows === 1) {
      console.log("删除数据成功");
      res.send({
        code: 1,
        msg: "用户信息删除成功",
        data: null,
      });
    }
  });
});

// 5. 导出路由模块
module.exports = router;
