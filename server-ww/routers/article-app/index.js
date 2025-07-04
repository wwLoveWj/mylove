const express = require("express");
const router = express.Router();

// 模拟数据
let articles = [
  {
    id: "1",
    title: "React 18 新特性详解：并发渲染与自动批处理",
    summary:
      "React 18 带来了许多激动人心的新特性，包括并发渲染、自动批处理、Suspense 改进等。",
    content: "React 18 是 React 的一个重要版本更新，引入了并发渲染的概念...",
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    category: "react",
    author: "React 官方团队",
    authorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    publishTime: "2024-01-15T10:00:00Z",
    readCount: 1250,
    likeCount: 89,
    commentCount: 2,
    isLiked: false,
    isCollected: false,
    tags: ["React", "JavaScript", "前端"],
  },
  // ... 其他文章
];

let categories = [
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

let comments = [
  {
    id: "1",
    articleId: "1",
    content: "这篇文章写得很好，对 React 18 的新特性解释得很清楚！",
    author: "前端开发者",
    authorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    createTime: "2024-01-15T11:30:00Z",
    likeCount: 12,
    isLiked: false,
  },
  // ... 其他评论
];

// 假设用户ID为1，收藏和点赞都在内存中模拟
let userLikes = {}; // { 'userId:articleId': true }
let userCollections = {}; // { 'userId:articleId': true }

// 获取分类
router.get("/categories", (req, res) => {
  res.json(categories);
});

// 获取文章列表
router.get("/list", (req, res) => {
  const { category, page = 1, pageSize = 10 } = req.query;
  let list = articles;
  if (category && category !== "recommend") {
    list = list.filter((a) => a.category === category);
  }
  const total = list.length;
  const start = (page - 1) * pageSize;
  const end = start + Number(pageSize);
  res.send({
    code: 1,
    msg: `文章列表请求成功~`,
    data: {
      list: list.slice(start, end),
      total,
      page: Number(page),
      pageSize: Number(pageSize),
    },
  });
});

// 文章详情
router.get("/detail/:id", (req, res) => {
  const article = articles.find((a) => a.id === req.params.id);
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
router.get("/comments", (req, res) => {
  const { articleId, page = 1, pageSize = 20 } = req.query;
  const list = comments.filter((c) => c.articleId === articleId);
  const total = list.length;
  const start = (page - 1) * pageSize;
  const end = start + Number(pageSize);
  res.send({
    code: 1,
    msg: `评论查询成功~`,
    data: {
      list: list.slice(start, end),
      total,
    },
  });
});

// 发表评论
router.post("/comment", (req, res) => {
  const { articleId, content } = req.body;
  const newComment = {
    id: Date.now().toString(),
    articleId,
    content,
    author: "测试用户",
    authorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    createTime: new Date().toISOString(),
    likeCount: 0,
    isLiked: false,
  };
  comments.unshift(newComment);
  // 更新文章评论数
  const article = articles.find((a) => a.id === articleId);
  if (article) article.commentCount += 1;
  res.send({
    code: 1,
    msg: `评论发表成功~`,
    data: newComment,
  });
});

// 点赞
router.post("/like", (req, res) => {
  const { articleId, userId = "1" } = req.body;
  userLikes[`${userId}:${articleId}`] = true;
  const article = articles.find((a) => a.id === articleId);
  if (article) article.likeCount += 1;
  res.send({
    code: 1,
    msg: `感谢你的小心心~`,
    data: null,
  });
});

// 取消点赞
router.post("/unlike", (req, res) => {
  const { articleId, userId = "1" } = req.body;
  userLikes[`${userId}:${articleId}`] = false;
  const article = articles.find((a) => a.id === articleId);
  if (article && article.likeCount > 0) article.likeCount -= 1;
  res.send({
    code: 1,
    msg: `你不喜欢人家了嘛~`,
    data: null,
  });
});

// 收藏
router.post("/collect", (req, res) => {
  const { articleId, userId = "1" } = req.body;
  userCollections[`${userId}:${articleId}`] = true;
  const article = articles.find((a) => a.id === articleId);
  if (article) article.isCollected = true;
  res.send({
    code: 1,
    msg: `不要放到收藏夹落灰哦~`,
    data: null,
  });
});

// 取消收藏
router.post("/uncollect", (req, res) => {
  const { articleId, userId = "1" } = req.body;
  userCollections[`${userId}:${articleId}`] = false;
  const article = articles.find((a) => a.id === articleId);
  if (article) article.isCollected = false;
  res.send({
    code: 1,
    msg: `懒得动了？`,
    data: null,
  });
});

// 我的收藏
router.get("/my-collections", (req, res) => {
  const { userId = "1", page = 1, pageSize = 10 } = req.query;
  const list = articles.filter((a) => userCollections[`${userId}:${a.id}`]);
  const total = list.length;
  const start = (page - 1) * pageSize;
  const end = start + Number(pageSize);
  res.send({
    code: 1,
    msg: `一大堆收藏正在袭来~`,
    data: {
      list: list.slice(start, end),
      total,
      page: Number(page),
      pageSize: Number(pageSize),
    },
  });
});

module.exports = router;
