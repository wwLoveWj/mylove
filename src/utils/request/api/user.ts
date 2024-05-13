import request from "../index";

export const Login = () => {
  return request.post<{
    data: {
      code: number;
      message: string;
      data: {
        token: string;
      };
    };
  }>("/api/user/login");
};

export const UserInfo = (): Promise<any> => {
  return request.get("/userInfo");
};
export const UserInfoCreate = (params: any): Promise<any> => {
  return request.post("/userInfo/create", params);
};
// 更新用户信息
export const UserInfoUpdate = (params: any): Promise<any> => {
  return request.post("/userInfo/edit", params);
};
export const UserInfoDel = (params: any): Promise<any> => {
  return request.post("/userInfo/delete", params);
};
