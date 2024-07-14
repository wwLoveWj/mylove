const express = require("express");
const db = require("../../utils/mysql");
const { camelCaseKeys, handleQueryDb } = require("../../utils");

const router = express.Router();

// 通过userId查到roleId，通过roleId查到menusId
router.get("/menuIdsByroleIdByUserId", (req, res) => {
  // 1. 接收前端传的参数
  let userId = req.query.userId;
  console.log("菜单对应ids权限查询参数", userId);
  // 2. 拼接sql语句准备去数据库查询
  let sqlStr = `SELECT roles.menuIds
  FROM roles
  JOIN users_role ON roles.role_id = users_role.role_id
  WHERE users_role.user_id =?`;
  db.query(sqlStr, userId, (err, rows) => {
    // 查询数据失败
    if (err) return console.log(err.message);
    // 查询数据成功
    rows = rows.map((item) => camelCaseKeys(item));
    console.log("菜单对应ids权限值查询成功~", rows);
    res.send({
      code: 1,
      msg: "success",
      data: rows,
    });
  });
});
// 根据角色id查询能看到的菜单有哪些（前提是这些菜单是启用状态的）
router.get("/roleMenuByMenuId", (req, res) => {
  // 1. 接收前端传的参数
  let menuIds = req.query.menuIds;
  console.log("角色菜单信息查询参数", menuIds);
  // 2. 拼接sql语句准备去数据库查询
  let sqlStr = `SELECT * FROM menus WHERE id IN (${menuIds}) AND isDel = 1 AND status = 1`;
  db.query(sqlStr, (err, rows) => {
    // 查询数据失败
    if (err) return console.log(err.message);
    // 查询数据成功
    rows = rows.map((item) => camelCaseKeys(item));
    console.log("菜单信息查询成功~");
    res.send({
      code: 1,
      msg: "success",
      data: rows,
    });
  });
});
// 查询角色列表所有信息
router.get("/roleList", (req, res) => {
  const sqlStr = "select * from roles";
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
      msg: "角色信息查询成功~",
      data: rows,
    });
  });
});

// 用户权限列表接口
router.get("/usersAuthList", (req, res) => {
  const sqlStr = "select * from users_role";
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
    rows = rows.map((item) => camelCaseKeys(item));
    res.send({
      code: 1,
      msg: "权限信息查询成功~",
      data: rows,
    });
  });
});
/**
 * 用户授权接口
 */
router.post("/userAuth", (req, res) => {
  let params = req.body;
  const sqlStr =
    "insert into users_role (user_id, role_id,description,rolename,username) values (?,?,?,?,?)";
  // 执行 SQL 语句，使用数组的形式，依次为 ? 占位符指定具体的值
  handleQueryDb(
    sqlStr,
    [
      params.userId,
      params.roleId,
      params.description,
      params.rolename,
      params.username,
    ],
    res,
    "用户授权成功~"
  );
});
// 解除用户授权
router.post("/revokeAuthorization", (req, res) => {
  let params = req.body;
  const sqlStr = "delete from users_role where id=?";
  handleQueryDb(sqlStr, params.id, res, "解除用户授权成功~");
});

module.exports = router;
