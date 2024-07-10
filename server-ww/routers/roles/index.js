const express = require("express");
const db = require("../../utils/mysql");
const { camelCaseKeys, handleQueryDb } = require("../../utils");

const router = express.Router();

// 根据角色id查询能看到的菜单有哪些（前提是这些菜单是启用状态的）
router.get("/roleMenuByMenuId", (req, res) => {
  // 1. 接收前端传的参数
  let menuIds = req.query.menuIds;
  console.log("角色信息查询参数", menuIds);
  // 2. 拼接sql语句准备去数据库查询
  let sqlStr = `SELECT * FROM menus WHERE id IN (${menuIds}) AND isDel = 1 AND status = 1`;
  db.query(sqlStr, (err, rows) => {
    // 查询数据失败
    if (err) return console.log(err.message);
    // 查询数据成功
    rows = rows.map((item) => camelCaseKeys(item));
    console.log("角色信息查询成功~", rows);
    res.send({
      code: 1,
      msg: "success",
      data: rows,
    });
  });
});

module.exports = router;
