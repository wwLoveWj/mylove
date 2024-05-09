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
