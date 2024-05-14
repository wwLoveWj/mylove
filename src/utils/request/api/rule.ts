
import request from "../index";

export const getMoneySvg = (params: any): Promise<any> => {
   return request.get("/getMoneySvg", params);
};
