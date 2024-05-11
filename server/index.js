const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const db = require("./mysql");

const app = express();
app.use(cors());
// 用于解析JSON类型的请求体
app.use(express.json());

// 用于解析URLEncoded的请求体
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// 请求用户信息
app.get("/api/usersInfo", (req, res) => {
  res.send({
    username: "ww",
    age: 18,
    profession: "Frontend programmers",
  });
});

// 获取飞机选座模型svg
app.get("/setOthersUrlSvg", (req, res) => {
  const ROOT_PATH = "https://echarts.apache.org/examples";
  console.log("正在处理请求...");
  axios.get(ROOT_PATH + "/data/asset/geo/flight-seats.svg").then((resl) => {
    fs.writeFile("./public/airport.svg", resl.data, (err) => {
      if (err) res.send(err);
      res.send({
        message: "success write!",
      });
    });
  });
});
// 因为上面的网址经常拿不到请求，所以直接存入服务端再返回出去
app.get("/getOthersUrlSvg", (req, res) => {
  const svg = fs.readFileSync("./public/airport.svg");
  // 假设我们有一个Buffer对象，包含HTML内容
  // const Buffer = require("buffer").Buffer;
  // const buffer = Buffer.from(svg);
  // // 将Buffer转换为字符串
  // const htmlString = buffer.toString();
  res.send({
    code: 0,
    message: "success",
    data: {
      svg: svg.toString(),
    },
  });
});

/**
 * 处理数据库中短横线转换小驼峰命名
 * @param {*} obj 数据库中的字段信息
 * @returns
 */
function camelCaseKeys(obj) {
  const result = {};
  for (let key in obj) {
    let newKey =
      key[0].toLowerCase() +
      key.slice(1).replace(/_([a-z])/g, function ($0, $1) {
        return $1.toUpperCase();
      });
    result[newKey] = obj[key];
  }
  return result;
}
// 获取所有用户信息
const lianbiao = async (res) => {
  // 查询 users 表中所有的数据
  const sqlStr = "select * from user";
  await db.query(sqlStr, (err, rows) => {
    // 查询数据失败
    if (err) return console.log(err.message);
    // 查询数据成功
    // 注意：如果执行的是 select 查询语句，则执行的结果是数组
    // console.log(results);
    rows = rows.map((item) => camelCaseKeys(item));
    res.send({
      code: 0,
      message: "success",
      data: rows,
    });
  });
};

app.get("/userInfo", (req, res) => {
  try {
    lianbiao(res);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

app.post("/userInfo/create", (req, res) => {
  // 向 users 表中，新增一条数据，其中 username 的值为 Spider-Man，password 的值为 pcc123
  let user = req.body;
  console.log(user, "444");
  // 定义待执行的 SQL 语句，其中英文的 ? 表示占位符
  const sqlStr =
    "insert into user (user_id,username, age,weight,score,status) values (?, ?,?,?,?,?)";
  // 执行 SQL 语句，使用数组的形式，依次为 ? 占位符指定具体的值
  db.query(
    sqlStr,
    [
      user.userId,
      user.username,
      user.age,
      user.weight,
      user.score,
      user.status,
    ],
    (err, results) => {
      // 执行 SQL 语句失败了
      if (err) return console.log(err.message);
      // 成功了
      // 注意：如果执行的是 insert into 插入语句，则 results 是一个对象
      // 可以通过 affectedRows 属性，来判断是否插入数据成功
      if (results.affectedRows === 1) {
        console.log("插入数据成功!", results);
        res.send({
          code: 0,
          message: "success",
          data: null,
        });
      }
    }
  );
});

// 分数信息接口
app.get("/scoreInfo", async (req, res) => {
  try {
    // 查询 users 表中所有的数据
    const sqlStr = "select * from score";
    await db.query(sqlStr, (err, rows) => {
      // 查询数据失败
      if (err) return console.log(err.message);
      // 查询数据成功
      rows = rows.map((item) => camelCaseKeys(item));
      res.send({
        code: 0,
        message: "success",
        data: rows,
      });
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

app.post("/scoreInfo/create", (req, res) => {
  let user = req.body;
  console.log(user, "666");
  // 定义待执行的 SQL 语句，其中英文的 ? 表示占位符
  const sqlStr =
    "insert into score (score_id,user_id,username,deduction_score,reason,description,update_time,score) values (?,?,?,?,?,?,?,?)";
  const sqlUser = "update user set score=? where user_id=?";

  // 执行 SQL 语句，使用数组的形式，依次为 ? 占位符指定具体的值
  db.query(
    sqlStr,
    [
      user.scoreId,
      user.userId,
      user.username,
      user.deductionScore,
      user.reason,
      user.description,
      user.updateTime,
      user.score,
    ],
    (err, results) => {
      // 执行 SQL 语句失败了
      if (err) return console.log(err.message);
      // 可以通过 affectedRows 属性，来判断是否插入数据成功
      if (results.affectedRows === 1) {
        console.log("插入数据成功!", results);
        res.send({
          code: 0,
          message: "success",
          data: null,
        });
        // 等分数表插入成功后再去改分数
        db.query(sqlUser, [user.score, user.userId], (err, results) => {
          if (err) return console.log(err.message);
          // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
          if (results.affectedRows === 1) {
            console.log("更新成功");
            res.send({
              code: 0,
              message: "success",
              data: null,
            });
          }
        });
      }
    }
  );
});

app.post("/scoreInfo/edit", (req, res) => {
  let user = req.body;
  const sqlUser =
    "update score set score=?, deduction_score=?, reason=?, description=?, update_time=? where score_id=?";
  db.query(
    sqlUser,
    [
      user.score,
      user.deductionScore,
      user.reason,
      user.description,
      user.updateTime,
      user.scoreId,
    ],
    (err, results) => {
      if (err) return console.log(err.message);
      // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
      if (results.affectedRows === 1) {
        console.log("更新成功");
        res.send({
          code: 0,
          message: "success",
          data: null,
        });
      }
    }
  );
});

app.post("/scoreInfo/delete", (req, res) => {
  let user = req.body;
  const sqlStr = "delete from score where score_id=?";
  db.query(sqlStr, user.scoreId, (err, results) => {
    if (err) return console.log(err.message);
    // 注意：执行 delete 语句之后，结果也是一个对象，也会包含 affectedRows 属性
    if (results.affectedRows === 1) {
      console.log("删除数据成功");
      // res.send({
      //   code: 0,
      //   message: "删除数据成功",
      //   data: null,
      // });
    }
  });
});
app.listen(3007, () => {
  console.log("服务开启在3007端口");
});
