const express = require("express");
const router = express.Router();
const db = require("../../utils/mysql");

/**
 * 新增文章
 * @route POST /api/article/add
 */
// router.post("/add", async (req, res) => {
//   const {
//     title,
//     content,
//     coverType,
//     coverUrl,
//     type,
//     visible,
//     tag,
//     column,
//     author,
//     authorAvatar,
//   } = req.body;

//   // 校验必填项
//   if (!title || !content) {
//     return res.json({ code: 0, msg: "标题和内容不能为空" });
//   }

//   try {
//     const sql = `
//       INSERT INTO article_app
//       (title, content, coverType, coverUrl, type, visible, tag, \`column\`, author, authorAvatar, publishTime)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
//     `;
//     const params = [
//       title,
//       content,
//       coverType,
//       coverUrl,
//       type,
//       visible,
//       tag,
//       column,
//       author,
//       authorAvatar,
//     ];
//     const result = await db.query(sql, params);
//     res.json({ code: 1, msg: "新增成功", data: { id: result.insertId } });
//   } catch (err) {
//     console.error("新增文章失败", err);
//     res.json({ code: 0, msg: "新增失败", error: err.message });
//   }
// });

// 获取分类（静态）
const categories = [
  { key: "recommend", title: "推荐" },
  { key: "js", title: "JavaScript" },
  { key: "css", title: "CSS" },
  { key: "github", title: "GitHub" },
  { key: "git", title: "Git" },
  { key: "react", title: "React" },
  { key: "vue", title: "Vue" },
  { key: "vite", title: "Vite" },
  { key: "webpack", title: "Webpack" },
];
router.get("/categories", (req, res) => {
  res.json(categories);
});

// 获取文章列表
router.get("/list", async (req, res) => {
  const { category, page = 1, pageSize = 10, isPage = false } = req.query;
  let sql = "SELECT * FROM article_app";
  let params = [];
  if (category && category !== "recommend") {
    sql += " WHERE category = ?";
    params.push(category);
  }
  if (isPage) {
    sql += " ORDER BY publishTime DESC LIMIT ?, ?";
    params.push((page - 1) * pageSize, Number(pageSize));
  }
  const [list, totalRes] = await Promise.all([
    db.query(sql, params),
    db.query(
      `SELECT COUNT(*) as total FROM article_app${category && category !== "recommend" ? " WHERE category = ?" : ""}`,
      category && category !== "recommend" ? [category] : []
    ),
  ]);
  const total = Array.isArray(totalRes) && totalRes[0] ? totalRes[0].total : 0;
  res.send({
    code: 1,
    msg: `文章列表请求成功~`,
    data: {
      list,
      total,
      page: Number(page),
      pageSize: Number(pageSize),
    },
  });
});

// 文章详情
router.get("/detail/:id", async (req, res) => {
  const [article] = await db.query("SELECT * FROM article_app WHERE id = ?", [
    req.params.id,
  ]);
  if (!article) return res.status(404).json({ msg: "未找到文章" });
  res.send({
    code: 1,
    msg: `文章详情查询成功~`,
    data: {
      ...article,
      htmlContent: `<h1>${article.title}</h1><p>${article.summary}</p>`,
      markdownContent: `# ${article.title}\n\n${article.summary}`,
    },
  });
});

// 获取评论
router.get("/comments", async (req, res) => {
  const { articleId, page = 1, pageSize = 20 } = req.query;
  const list = await db.query(
    "SELECT * FROM article_comment WHERE articleId = ? ORDER BY createTime DESC LIMIT ?, ?",
    [articleId, (page - 1) * pageSize, Number(pageSize)]
  );
  const totalRes = await db.query(
    "SELECT COUNT(*) as total FROM article_comment WHERE articleId = ?",
    [articleId]
  );
  res.send({
    code: 1,
    msg: `评论查询成功~`,
    data: {
      list,
      total: totalRes[0].total,
    },
  });
});

// 发表评论
router.post("/comment", async (req, res) => {
  const { articleId, content } = req.body;
  const author = "测试用户";
  const authorAvatar =
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face";
  await db.query(
    "INSERT INTO article_comment (articleId, content, author, authorAvatar) VALUES (?, ?, ?, ?)",
    [articleId, content, author, authorAvatar]
  );
  await db.query(
    "UPDATE article_app SET commentCount = commentCount + 1 WHERE id = ?",
    [articleId]
  );
  res.send({
    code: 1,
    msg: `评论发表成功~`,
    data: null,
  });
});

// 点赞
router.post("/like", async (req, res) => {
  const { articleId, userId = "1" } = req.body;
  await db.query(
    "INSERT IGNORE INTO article_user_like (userId, articleId) VALUES (?, ?)",
    [userId, articleId]
  );
  await db.query(
    "UPDATE article_app SET likeCount = likeCount + 1 , isLiked = 1 WHERE articleId = ?",
    [articleId]
  );
  res.send({
    code: 1,
    msg: `感谢你的小心心~`,
    data: null,
  });
});

// 取消点赞
router.post("/unlike", async (req, res) => {
  const { articleId, userId = "1" } = req.body;
  await db.query(
    "DELETE FROM article_user_like WHERE userId = ? AND articleId = ?",
    [userId, articleId]
  );
  await db.query(
    "UPDATE article_app SET likeCount = IF(likeCount>0, likeCount-1, 0) ,isLiked = 0 WHERE articleId = ?",
    [articleId]
  );
  res.send({
    code: 1,
    msg: `你不喜欢人家了嘛~`,
    data: null,
  });
});

// 收藏
router.post("/collect", async (req, res) => {
  const { articleId, userId = "1" } = req.body;
  await db.query(
    "INSERT IGNORE INTO article_user_collection (userId, articleId) VALUES (?, ?)",
    [userId, articleId]
  );
  await db.query("UPDATE article_app SET isCollected = 1 WHERE articleId = ?", [
    articleId,
  ]);
  res.send({
    code: 1,
    msg: `不要放到收藏夹落灰哦~`,
    data: null,
  });
});

// 取消收藏
router.post("/uncollect", async (req, res) => {
  const { articleId, userId = "1" } = req.body;
  await db.query(
    "DELETE FROM article_user_collection WHERE userId = ? AND articleId = ?",
    [userId, articleId]
  );
  await db.query("UPDATE article_app SET isCollected = 0 WHERE articleId = ?", [
    articleId,
  ]);
  res.send({
    code: 1,
    msg: `懒得动了？`,
    data: null,
  });
});

// 我的收藏
router.get("/my-collections", async (req, res) => {
  const { userId = "1", page = 1, pageSize = 10 } = req.query;
  const list = await db.query(
    `SELECT a.* FROM article_app a
     JOIN article_user_collection c ON a.id = c.articleId
     WHERE c.userId = ?
     ORDER BY c.id DESC
     LIMIT ?, ?`,
    [userId, (page - 1) * pageSize, Number(pageSize)]
  );
  const totalRes = await db.query(
    `SELECT COUNT(*) as total FROM article_user_collection WHERE userId = ?`,
    [userId]
  );
  res.send({
    code: 1,
    msg: `一大堆收藏正在袭来~`,
    data: {
      list,
      total: totalRes[0].total,
      page: Number(page),
      pageSize: Number(pageSize),
    },
  });
});

// 新增文章
router.post("/add", async (req, res) => {
  const {
    title,
    summary,
    content,
    coverImage,
    category,
    author,
    authorAvatar,
    tags,
    articleId,
  } = req.body;
  if (!title || !content) {
    return res.json({ code: 1, msg: "标题和内容不能为空" });
  }
  const sql = `
    INSERT INTO article_app
    (title, summary, content, coverImage, category, author, authorAvatar, tags, articleId, publishTime)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;
  const params = [
    title,
    summary,
    content,
    coverImage,
    category,
    author,
    authorAvatar,
    Array.isArray(tags) ? tags.join(",") : tags,
    articleId,
  ];
  const result = await db.query(sql, params);
  res.json({ code: 1, msg: "新增成功", data: { id: result.insertId } });
});

module.exports = router;
