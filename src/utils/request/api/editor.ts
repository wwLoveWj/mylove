import request from "../index";

export const setEditorHtmlAPI = (params: any): Promise<any> => {
  return request.post("/editor/setEditorHtml", params);
};
export const getEditorHtmlAPI = (params: any): Promise<any> => {
  return request.get("/editor/getEditorHtml", params);
};
