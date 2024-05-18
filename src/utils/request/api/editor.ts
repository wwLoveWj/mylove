import request from "../index";

export const setEditorHtmlAPI = (params: any): Promise<any> => {
  return request.post("/editor/setEditorHtml", params);
};
// 根据editorId查询文章对应明细
export const getEditorHtmlAPI = (params: any): Promise<any> => {
  return request.post("/editor/getEditorHtml", params);
};
// 文章列表信息
export const getEditorTableAPI = (params: any): Promise<any> => {
  return request.get("/editor/getEditorTable", params);
};
export const EditorInfoDeleteAPI = (params: any): Promise<any> => {
  return request.post("/editor/delete", params);
};
