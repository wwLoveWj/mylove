import request from "../index";

export const setEditorHtmlAPI = (params: any): Promise<any> => {
  return request.post("/setEditorHtml", params);
};
export const getEditorHtmlAPI = (params: any): Promise<any> => {
  return request.get("/getEditorHtml", params);
};
