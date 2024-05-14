import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import React, { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import { useRequest } from "ahooks";
import { setEditorHtmlAPI, getEditorHtmlAPI } from "@/utils/request/api/editor";
import { Button } from "antd";
import _ from "lodash";

function MyEditor() {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  // 编辑器内容
  const [html, setHtml] = useState("<p>hello</p>");

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "请输入内容...",
  };
  //   存储编辑器内容接口
  const AddEditorHtmlAPIRun = useRequest(
    (params: any) => setEditorHtmlAPI(params),
    {
      debounceWait: 100,
      manual: true, //若设置了这个参数,则不会默认触发,需要通过run触发
    }
  );

  const changeEditor = () => {
    setHtml(editor.getHtml());
    AddEditorHtmlAPIRun.run({
      editorContent: editor.getHtml(),
    });
  };

  const changeEditorDB = _.debounce(changeEditor, 10000);
  //   获取编辑器信息
  useRequest(() => getEditorHtmlAPI({}), {
    debounceWait: 100,
    onSuccess: (res) => {
      setHtml(res[res.length - 1]?.editorContent);
    },
  });
  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <Button type="primary" onClick={changeEditor}>
        保存
      </Button>
      <div style={{ border: "1px solid #ccc", zIndex: 100, marginTop: "12px" }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          //   onChange={(editor) => {
          //     changeEditorDB(editor);
          //   }}
          mode="default"
          style={{ height: "500px", overflowY: "hidden" }}
        />
      </div>
      {/* <div style={{ marginTop: "15px" }}>{html}</div> */}
    </>
  );
}

export default MyEditor;
