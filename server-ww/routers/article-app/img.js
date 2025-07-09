const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // 原图临时存储

// 确保缩略图目录存在
const thumbDir = path.join(__dirname, "uploads/thumbs");
if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir, { recursive: true });

/**
 * 上传图片并生成缩略图
 */
router.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });

  // 原图路径
  const originalPath = file.path;
  // 缩略图路径
  const thumbPath = path.join(thumbDir, "thumb_" + file.filename + ".jpg");

  // 生成缩略图（宽度200px，等比缩放）
  await sharp(originalPath)
    .resize({ width: 200 })
    .jpeg({ quality: 80 })
    .toFile(thumbPath);
  res.send({
    code: 1,
    msg: `图片上传成功~`,
    data: {
      url: `http://localhost:3007/img/uploads/${file.filename}`, // 大图
      thumbUrl: `http://localhost:3007/img/uploads/thumbs/thumb_${file.filename}.jpg`, // 小图
    },
  });
  // 假设静态资源可通过 /uploads 访问
  //   res.json({
  //     url: `http://localhost:3007/uploads/${file.filename}`, // 大图
  //     thumbUrl: `http://localhost:3007/uploads/thumbs/thumb_${file.filename}.jpg`, // 小图
  //   });
});

// 静态资源服务
router.use("/uploads", express.static(path.join(__dirname, "uploads")));

module.exports = router;
