import { Navigate, Outlet } from "umi";
// 用户管理的权限控制
export default () => {
  // 是否已登录的判断，相当于路由守卫
  const isLogin = Boolean(localStorage.getItem("token"));
  if (!isLogin) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
