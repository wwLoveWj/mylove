import {
  Outlet,
  useLocation,
  history,
  useIntl,
  useRouteProps,
  KeepAlive,
} from "umi";
// import { KeepAlive } from "umi-plugin-keep-alive";
import React, { useState, useEffect } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, Avatar, Badge, Dropdown } from "antd";
import { routes } from "../../config/router"; // 配置的菜单项
import _ from "lodash"; // 引入JS工具库
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import LangChgIndex from "./components/LangChgIndex";
import SideBarRender from "./components/menu";
import SwitchTheme from "@/components/switchTheme";
import PageTabs from "./components/PageTabs";
import "./index.less";
import { RouterItem, MenuType } from "./type";
import loadingModel from "./config";
import { getAllNodes, getTagTitle } from "@/utils/index";

const { Header, Content, Sider } = Layout;
// 获取到所有的菜单数据进行处理
const menus =
  routes
    ?.find((route) => route.path === "/")
    ?.routes?.filter((item: any) => !item.redirect) || [];

const items1: MenuProps["items"] = ["vip", "svip", "super"].map((key) => ({
  key,
  label: `${key}`,
}));

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { path, title, id } = useRouteProps();
  const [breadcrumbItems, setBreadcrumbItems] = useState<
    { title: any; path: string; className?: string }[]
  >([]); //面包屑的配置项
  const [themeMenu, setThemeMenu] = useState<MenuType>("dark");
  const [checkedTheme, setCheckedTheme] = useState(true); //是否切换主题
  const [themeColor, setThemeColor] = useState("#001629"); //切换headers主题
  const [themeColorLang, setThemeColorLang] = useState("#fff");
  const { pathname } = useLocation();
  // 国际化配置
  const intl = useIntl();
  const lang = intl.locale;
  const t = (id: string) => intl.formatMessage({ id });
  // 切换主题
  const handleChange = (e: any) => {
    if (e.target.checked) {
      //黑夜模式
      setThemeMenu("dark");
      setThemeColor("#001629");
      setThemeColorLang("#fff");
      setCheckedTheme(true);
    } else {
      //白天模式
      setThemeMenu("light");
      setThemeColor("#f5f5f5");
      setThemeColorLang("#000");
      setCheckedTheme(false);
    }
  };
  // 路由变化设置选择项
  const initSetTabs = (path: string) => {
    const newAllRoutes = getAllNodes(routes);
    // 拿到当前路由对象信息
    let routeItem: any = newAllRoutes.find(
      (val: RouterItem) => val.key === path.split("/")[1]
    );
    let arr = [];
    if (routeItem?.routes?.length > 0) {
      const pathTitle = getTagTitle("/" + path.split("/")[1], routes);
      arr.push({
        path,
        title: (
          <>
            <LaptopOutlined />
            <span>{t(pathTitle)}</span>
          </>
        ),
        className: "disabled-breadcrumb-item",
      });
    }
    const pathTitle1 = getTagTitle(path, routes);
    arr.push({
      path,
      title: t(pathTitle1),
      className: "disabled-breadcrumb-item",
    });
    setBreadcrumbItems([
      {
        path: "/",
        title: <HomeOutlined />,
      },
      ...arr,
    ]);
  };

  useEffect(() => {
    pathname !== "/" && initSetTabs(pathname);
  }, [pathname, lang]);

  // useEffect(() => {
  //   loadingModel();
  // }, []);
  const avatarItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          onClick={() => {
            history.push("/login");
            localStorage.clear();
          }}
        >
          退出登录
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            history.push("/center");
          }}
        >
          个人中心
        </a>
      ),
    },
  ];

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          background: themeColor,
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme={themeMenu}
          mode="horizontal"
          style={{ background: themeColor, flex: 1, minWidth: 0 }}
          defaultSelectedKeys={["vip"]}
          items={items1}
        />
        <LangChgIndex themeColor={themeColorLang} />
        <SwitchTheme handleChange={handleChange} checkedTheme={checkedTheme} />
        <Dropdown menu={{ items: avatarItems }} placement="bottomRight" arrow>
          <Badge count={1}>
            <Avatar
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
              style={{
                backgroundColor: "#f56a00",
                marginLeft: "12px",
                cursor: "pointer",
              }}
            />
          </Badge>
        </Dropdown>
      </Header>
      <Layout>
        <Sider className="sider-area-menu">
          <SideBarRender menus={menus} theme={themeMenu} />
        </Sider>
        <Layout style={{ background: "#f0f3f4" }}>
          <Breadcrumb
            style={{ padding: "6px 12px", background: "#fff" }}
            items={breadcrumbItems}
          />
          <PageTabs />
          <Layout style={{ padding: 12 }}>
            <Content
              style={{
                margin: 0,
                padding: 12, //内部容器的padding
                minHeight: 280,
                // background: colorBgContainer,
                borderRadius: borderRadiusLG,
                background: "#fff",
                height: "calc(100vh - 152px)",
                overflow: "auto",
              }}
            >
              <KeepAlive
                id={id}
                name={path}
                tabName={t(title || "router.integralTable")}
              >
                <Outlet />
              </KeepAlive>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
