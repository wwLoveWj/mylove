import type { MenuProps } from "antd";
import { Menu } from "antd";
import _ from "lodash"; // 引入JS工具库
import React, { useState, useEffect } from "react";
import { Link, useLocation, useIntl } from "umi";
import { RouterItem, MenuType } from "../type";

const { SubMenu } = Menu; // 子菜单

// 左侧菜单的menu结构数据
function sideBarRender({
  menus,
  theme,
}: {
  menus: RouterItem[];
  theme: MenuType;
}) {
  const [saveKeyPath, setSaveKeyPath] = useState<string[]>([]); //存储选中的菜单路径集合
  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([]);
  const location = useLocation();
  // 国际化配置
  const intl = useIntl();
  const t = (id: string) => intl.formatMessage({ id });

  /**
   * 获取左侧菜单项
   * @param menuArr 所有的路由配置
   * @returns
   */
  function getMenuItem(menuArr: any) {
    // 获取菜单项
    return _.map(menuArr, (route: RouterItem) => {
      if (route.routes) {
        // 有多级菜单时
        return (
          !route.hidden && (
            <SubMenu
              key={route.key}
              title={t(route.title || "")}
              icon={React.createElement(route.icon || "")}
            >
              {/*  重复调用函数渲染出子级菜单 */}
              {getMenuItem(route.routes)}
            </SubMenu>
          )
        );
      }
      return (
        !route.hidden && (
          <Menu.Item key={route.key}>
            <Link to={route.path || "/"}>{t(route.title || "")}</Link>
          </Menu.Item>
        )
      );
    });
  }
  const onOpenChange: MenuProps["onOpenChange"] = (openKeys: string[]) => {
    let keys = openKeys.slice(openKeys.length - 1);
    setStateOpenKeys(keys);
  };
  const onSelectMenu = ({ keyPath }: { keyPath: string[] }) => {
    setSaveKeyPath(keyPath);
  };

  useEffect(() => {
    let keys = location.pathname.split("/");
    keys.shift();
    setSaveKeyPath(keys);
    setStateOpenKeys(keys);
  }, [location.pathname]);

  return (
    <Menu
      mode="inline"
      theme={theme}
      selectedKeys={saveKeyPath}
      openKeys={stateOpenKeys}
      style={{ height: "100%", borderRight: 0 }}
      onOpenChange={onOpenChange}
      onSelect={onSelectMenu}
    >
      {getMenuItem(menus)}
    </Menu>
  );
}

export default sideBarRender;
