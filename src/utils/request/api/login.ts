import request from "../index";

export const registerUserAPI = (params: any): Promise<any> => {
  return request.post("/login/register", params);
};
export const loginUserAPI = (params: any): Promise<any> => {
  return request.post("/login/index", params);
};
// 发送注册验证码
export const sendMailCodeAPI = (params: any): Promise<any> => {
  return request.post("/code/send", params);
};
