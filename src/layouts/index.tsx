import { Outlet, useLocation } from "umi";
import "./index.less";
import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { routes } from "../../config/router"; // 配置的菜单项
import _ from "lodash"; // 引入JS工具库
import { useState, useEffect } from "react";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import LangChgIndex from "./components/LangChgIndex";
import SideBarRender from "./components/menuLeft";

interface RouterItem {
  title?: string;
  key?: string;
  path?: string;
  routes?: RouterItem[];
  component?: any;
  exact?: boolean;
  redirect?: string;
  hidden?: boolean;
}
const { Header, Content, Sider } = Layout;
// 获取到所有的菜单数据进行处理
const menus =
  routes
    ?.find((route) => route.path === "/")
    ?.routes?.filter((item) => !item.redirect) || [];
// const routerType = {
//   POP: "back",
//   PUSH: "in",
//   REPLACE: "in",
// };

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    items: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const App: React.FC = (props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [breadcrumbItems, setBreadcrumbItems] = useState<
    { title: string; path: string }[]
  >([]); //面包屑的配置项
  const locationUrl = useLocation();

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
                <UserOutlined />
                <span>{titleObj?.title}</span>
              </>
            ),
          }
        : {
            path: currentKeyPath[index],
            title: titleObj?.title,
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
  }, [locationUrl.pathname]);
  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
        <LangChgIndex />
      </Header>
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "calc(100vh - 64px)",
          }}
        >
          <SideBarRender menus={menus} colorBgContainer={colorBgContainer} />
        </Sider>
        <Layout>
          <Breadcrumb
            style={{ padding: "6px 12px", background: "#fff" }}
            items={breadcrumbItems}
          />
          <Layout style={{ padding: 6 }}>
            <Content
              style={{
                margin: 0,
                padding: 12, //内部容器的padding
                minHeight: 280,
                // background: colorBgContainer,
                borderRadius: borderRadiusLG,
                background: "#fff",
                height: "calc(100vh - 110px)",
                overflow: "auto",
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
