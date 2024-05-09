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
