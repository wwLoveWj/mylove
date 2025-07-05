const express = require("express");
const router = express.Router();
const db = require("../../utils/mysql");

/**
 * 新增文章
 * @route POST /api/article/add
 */
router.post("/add", async (req, res) => {
  const {
    title,
    content,
    coverType,
    coverUrl,
    type,
    visible,
    tag,
    column,
    author,
    authorAvatar,
  } = req.body;

  // 校验必填项
  if (!title || !content) {
    return res.json({ code: 0, msg: "标题和内容不能为空" });
  }

  try {
    const sql = `
      INSERT INTO article_app
      (title, content, coverType, coverUrl, type, visible, tag, \`column\`, author, authorAvatar, createTime)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    const params = [
      title,
      content,
      coverType,
      coverUrl,
      type,
      visible,
      tag,
      column,
      author,
      authorAvatar,
    ];
    const result = await db.query(sql, params);

    res.json({ code: 1, msg: "新增成功", data: { id: result.insertId } });
  } catch (err) {
    console.error("新增文章失败", err);
    res.json({ code: 0, msg: "新增失败", error: err.message });
  }
});
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
  {
    id: "2",
    title: "Vue 3 Composition API 深度解析",
    summary:
      "Vue 3 的 Composition API 为组件逻辑复用提供了更灵活的方式。本文将从基础概念到高级用法，全面解析 Composition API。",
    content: "Vue 3 的 Composition API 是一个全新的组件逻辑组织方式...",
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    category: "vue",
    author: "Vue.js 社区",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    publishTime: "2024-01-14T14:30:00Z",
    readCount: 980,
    likeCount: 67,
    commentCount: 15,
    isLiked: true,
    isCollected: true,
    tags: ["Vue", "JavaScript", "前端框架"],
  },
  {
    id: "3",
    title: "现代 CSS 布局技术：Grid 与 Flexbox 实战指南",
    summary:
      "CSS Grid 和 Flexbox 是现代网页布局的两大核心技术。本文将通过实际案例展示如何结合使用这两种技术创建复杂的响应式布局。",
    content: "CSS Grid 和 Flexbox 的出现彻底改变了网页布局的方式...",
    coverImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    category: "css",
    author: "CSS 专家",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    publishTime: "2024-01-13T09:15:00Z",
    readCount: 756,
    likeCount: 45,
    commentCount: 12,
    isLiked: false,
    isCollected: false,
    tags: ["CSS", "布局", "响应式"],
  },
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
