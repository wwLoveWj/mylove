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
    path: "/",
    component: "@/layouts/index", // 主页加载layout公共组件
    layout: false,
    routes: [
      {
        path: "/",
        exact: true,
        redirect: "/good-manage/good-quantity",
      },
      // 菜单的配置项，用于动态渲染 key:	唯一标志 title: 菜单项值 path：用于路由跳转
      {
        key: "user-manage",
        title: "用户管理",
        path: "/user-manage",
        wrappers: ["@/wrappers/auth"],
      },
      {
        key: "user-rules",
        title: "规则管理",
        path: "/rules",
        component: "./rules/index.tsx",
      },
      {
        key: "user-integral",
        title: "积分管理",
        path: "/user-integral",
        routes: [
          {
            key: "integral-table",
            title: "积分列表",
            path: "/user-integral/integral-table",
            component: "./integral/index",
          },
          {
            key: "integral-details",
            title: "积分明细",
            path: "/user-integral/integral-details",
            component: "./integral/Details",
            hidden: true,
          },
        ],
      },
      {
        key: "users",
        title: "用户管理",
        path: "/users",
        component: "./users/index.tsx",
      },
      {
        key: "good-manage",
        title: "商品管理",
        path: "/good-manage",
        routes: [
          // {
          //   path: "/good-manage",
          //   exact: true,
          //   redirect: "/good-manage/good-quantity",
          // },
          {
            key: "good-quantity",
            title: "商品数量",
            path: "/good-manage/good-quantity",
            component: "docs",
          },
          {
            key: "good-quality",
            title: "商品质量",
            path: "/good-manage/good-quality",
            component: "index",
          },
        ],
      },
      {
        key: "address-manage",
        title: "地址管理",
        routes: [
          {
            key: "my-address",
            title: "我的地址",
            path: "/address-manage/my-address",
          },
        ],
      },
      { key: "collect-manage", title: "收藏管理", path: "/collect-manage" },
      {
        key: "echarts",
        path: "/echarts",
        component: "./charts/Airport",
        title: "图表管理",
      },
    ],
  },
  // {
  //   path: "*",
  //   component: "./exception/404",
  //   redirect: "/exception/404",
  //   layout: false,
  // },
];
