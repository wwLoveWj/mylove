import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";

export const routes = [
  {
    path: "/exception",
    layout: false,
    routes: [
      {
        key: "404",
        path: "/exception/404",
        component: "./exception/404",
      },
      {
        key: "403",
        path: "/exception/403",
        component: "./exception/403",
      },
    ],
  },
  {
    path: "/login",
    component: "@/pages/login", // 加载login登录页面
    layout: false,
  },
  {
    path: "/register",
    component: "@/pages/login/register", // 加载login登录页面
    layout: false,
  },
  {
    path: "/tv",
    component: "@/pages/bgTv", // 加载tv开机动画
    layout: false,
  },
  {
    path: "/",
    component: "@/layouts/index", // 主页加载layout公共组件
    layout: false,
    routes: [
      {
        path: "/",
        exact: true,
        redirect: "/user-integral/integral-table",
      },
      // 菜单的配置项，用于动态渲染 key:	唯一标志 title: 菜单项值 path：用于路由跳转
      {
        key: "user-integral",
        title: "router.integrals",
        path: "/user-integral",
        icon: NotificationOutlined,
        routes: [
          {
            key: "integral-table",
            title: "router.integralTable",
            path: "/user-integral/integral-table",
            component: "./integral/index",
          },
          {
            key: "integral-details",
            title: "router.integralDetails",
            path: "/user-integral/integral-details",
            component: "./integral/Details",
            hidden: true,
          },
        ],
      },
      // {
      //   key: "good-manage",
      //   title: "商品管理",
      //   path: "/good-manage",
      //   icon: LaptopOutlined,
      //   routes: [
      //     // {
      //     //   path: "/good-manage",
      //     //   exact: true,
      //     //   redirect: "/good-manage/good-quantity",
      //     // },
      //     {
      //       key: "good-quantity",
      //       title: "商品数量",
      //       path: "/good-manage/good-quantity",
      //       component: "docs",
      //     },
      //     {
      //       key: "good-quality",
      //       title: "商品质量",
      //       path: "/good-manage/good-quality",
      //       component: "index",
      //     },
      //   ],
      // },
      // {
      //   key: "address-manage",
      //   title: "地址管理",
      //   icon: HomeOutlined,
      //   routes: [
      //     {
      //       key: "my-address",
      //       title: "我的地址",
      //       path: "/address-manage/my-address",
      //     },
      //   ],
      // },
      {
        key: "user-rules",
        title: "router.rules",
        path: "/user-rules",
        component: "./rules/index.tsx",
      },
      {
        key: "user-manage",
        title: "router.users",
        path: "/user-manage",
        wrappers: ["@/wrappers/auth"],
        component: "./users/index.tsx",
      },
      // { key: "collect-manage", title: "收藏管理", path: "/collect-manage" },
      {
        key: "echarts",
        path: "/echarts",
        component: "./charts/Airport",
        title: "router.echarts",
      },
      {
        key: "article",
        path: "/article",
        // component: "./article/index.tsx",
        title: "router.articles",
        icon: NotificationOutlined,
        routes: [
          {
            key: "table",
            path: "/article/table",
            component: "./article/index.tsx",
            title: "router.articles.table",
          },
          {
            key: "edit",
            title: "router.articles.edit",
            path: "/article/edit",
            component: "./article/EditArticle.tsx",
            hidden: true,
          },
          {
            key: "add",
            title: "router.articles.add",
            path: "/article/add",
            component: "./article/EditArticle.tsx",
            hidden: true,
          },
        ],
      },
      {
        key: "files",
        path: "/files",
        title: "router.files",
        icon: NotificationOutlined,
        hidden: true,
        routes: [
          {
            key: "upload",
            path: "/files/upload",
            component: "./files/Upload",
            title: "router.files.upload",
            hidden: true,
          },
        ],
      },
      {
        key: "mails",
        path: "/mails",
        title: "router.mails",
        icon: NotificationOutlined,
        routes: [
          {
            key: "send",
            path: "/mails/send",
            component: "./mails/index",
            title: "router.mails.send",
          },
          {
            key: "settings",
            path: "/mails/settings",
            component: "./mails/settings/index",
            title: "router.mails.settings",
          },
        ],
      },
      {
        key: "ai",
        path: "/ai",
        title: "router.ai",
        icon: NotificationOutlined,
        routes: [
          {
            key: "editor",
            path: "/ai/editor",
            component: "./AiEditor/index",
            title: "router.ai.editor",
          },
          {
            key: "question",
            path: "/ai/question",
            component: "./AiEditor/xinghuo/index",
            title: "router.ai.question",
          },
        ],
      },
      {
        key: "excel",
        path: "/excel",
        component: "./excel/index",
        title: "router.excel",
        hidden: true,
      },
      {
        key: "chronicle",
        path: "/chronicle",
        component: "./HistoricalStories/index",
        title: "router.chronicle",
      },
    ],
  },
  {
    key: "center",
    path: "/center",
    component: "./PersonCenter/index",
    title: "router.center",
    layout: false,
  },
  {
    key: "taichi",
    path: "/taichi",
    component: "./SupremePole/index",
    title: "router.taichi",
    layout: false,
  },
  {
    path: "*",
    component: "./exception/404",
    redirect: "/exception/404",
    layout: false,
  },
];
