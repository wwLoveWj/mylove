const express = require("express");
const multer = require("multer"); //上传文件中间件
const path = require("path");
const { storage, createFolder } = require("../utils/files");
const router = express.Router();

const uploadFolder = path.join(__dirname, "../upload"); //文件按照日期分割创建文件夹
createFolder(uploadFolder);
// 创建 multer 对象
const upload = multer({ storage: storage(uploadFolder) });

// 文件上传的接口
router.post("/upload", upload.single("file"), function (req, res, next) {
  const file = req.file;
  console.log("文件类型：%s", file.mimetype);
  console.log("原文件名：%s", file.originalname);
  console.log("文件大小：%s", file.size);
  console.log("保存路径：%s", file.path);

  // 接收文件成功后返回数据给前端
  res.send({ ...file, url: `http://localhost:3007/${file.filename}` });
  // 由于我们设置了app.use(express.static(path.join(__dirname, 'upload')))，这是我们在app.js托管的静态资源，访问时路径要去掉upload
});

module.exports = router;
