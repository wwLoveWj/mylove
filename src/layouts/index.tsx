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
  const { originPath, title } = useRouteProps();
  const [breadcrumbItems, setBreadcrumbItems] = useState<
    { title: string; path: string }[]
  >([]); //面包屑的配置项
  const [themeMenu, setThemeMenu] = useState<MenuType>("dark");
  const [checkedTheme, setCheckedTheme] = useState(true); //是否切换主题
  const [themeColor, setThemeColor] = useState("#001629"); //切换headers主题
  const [themeColorLang, setThemeColorLang] = useState("#fff");
  const locationUrl = useLocation();
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
  /**
   * 获取面包屑的配置数据
   */
  const keyPathMenu = (currentKeyPath: string[]) => {
    let arr: any = [];
    let brr: any = [];
    const getAllMenu = (result: RouterItem[]) => {
      (result || [])?.map((val) => {
        if (val.routes && val.routes?.length > 0) {
          getAllMenu(val.routes);
        }
        // 遍历routes配置，并且得到扁平化数组
        brr.push(val);
      });
    };
    getAllMenu(menus);
    // 拿到当前选中项的path路径进行组装面包屑配置
    currentKeyPath.map((item: any, index: number) => {
      // 找到与当前path匹配的router
      let titleObj: RouterItem = brr.find(
        (val: RouterItem) => val.key === currentKeyPath[index]
      );
      arr[index] = titleObj?.routes
        ? {
            path: currentKeyPath[index],
            title: (
              <>
                <LaptopOutlined />
                <span>{t(titleObj?.title || "router.integrals")}</span>
              </>
            ),
          }
        : {
            path: currentKeyPath[index],
            title: t(titleObj?.title || "router.integralTable"),
            className: "disabled-breadcrumb-item",
          };
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
    let result = locationUrl.pathname.split("/");
    result.shift();
    keyPathMenu(result);
  }, [locationUrl.pathname, lang]);

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
          href="https://www.aliyun.com"
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
                height: "calc(100vh - 122px)",
                overflow: "auto",
              }}
            >
              <KeepAlive id={originPath} name={originPath} tabName={title}>
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
