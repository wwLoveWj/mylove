import request from "../index";

export const MailInfoSendAPI = (params: any): Promise<any> => {
  return request.post("/mail/send", params);
};
