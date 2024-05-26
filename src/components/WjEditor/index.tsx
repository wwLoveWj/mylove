import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import React, { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import { useRequest } from "ahooks";
import { setEditorHtmlAPI, getEditorHtmlAPI } from "@/utils/request/api/editor";
import { Button, Affix, Tooltip } from "antd";
import { useLocation } from "umi";
import _ from "lodash";
import { guid } from "@/utils";
import { createWebSocket, closeWebSocket, websocket } from "./websocket";
import styles from "./style.less";
import {
  generateTableOfContents,
  addAnchorLinks,
  handleItemClick,
  getAllHtagList,
} from "./catalogue";
import "./style.less";

interface EditorTxtType {
  editorContent: string;
  title: string;
  editorId: string;
}
interface catalogueType {
  level: number;
  id: string;
  text: string | null;
  index: number;
}
interface Iprops {
  editorId: string;
  isRealTimeediting: boolean; //是否开启websocket监听消息
  action: string; //A为新增、E为编辑
}
function MyEditor() {
  const [editor, setEditor] = useState<IDomEditor | null>(null); // editor 实例
  const [html, setHtml] = useState(""); // 编辑器内容
  const [title, setTitle] = useState(""); //文章标题
  // 左侧锚点集合
  const [tableOfContents, setTableOfContents] = useState<catalogueType[]>([]); //目录结构集合
  const [activeIndex, setActiveIndex] = useState<number>(0); //设置当前选中的index
  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};
  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "请输入内容...",
  };
  const detailsData = (useLocation() as any).state;
  const { editorId, isRealTimeediting, action }: Iprops = detailsData || {
    editorId: "",
    isRealTimeediting: true,
    action: "A",
  };
  //   存储编辑器内容接口
  const AddEditorHtmlAPIRun = useRequest(
    (params: any) => setEditorHtmlAPI(params),
    {
      debounceWait: 100,
      manual: true,
    }
  );
  // 编辑器的数据保存提交事件
  const changeEditor = () => {
    if (editor) {
      setHtml(editor.getHtml());
      AddEditorHtmlAPIRun.run({
        editorContent: editor.getHtml(),
        editorId: action === "A" ? guid() : editorId,
        title,
      });
    }
  };

  const changeEditorDB = _.debounce(changeEditor, 10000);
  // 标题的输入事件
  const changeEditorTitle = () => {
    if (websocket.readyState === WebSocket.OPEN) {
      websocket &&
        editor &&
        websocket?.send(
          JSON.stringify({
            editorContent: editor.getHtml(),
            editorId: action === "A" ? guid() : editorId,
            title,
            action,
          })
        );
    } else {
      console.error("websocket 断开了......");
    }
  };
  const changeEditorTitleWs = _.debounce(changeEditorTitle, 6000);
  //   获取编辑器信息
  const searchEditorTxtApi = useRequest(() => getEditorHtmlAPI({ editorId }), {
    debounceWait: 100,
    manual: true,
    onSuccess: (res: EditorTxtType[]) => {
      // editor.restoreSelection(); //恢复选区
      setHtml(res[0]?.editorContent);
      setTitle(res[0]?.title);
      editorConfig.readOnly = true;
      editor && editor.focus(true);
    },
  });

  // const handleScroll = () => {
  //   debugger;
  //   requestAnimationFrame(() => {
  //     const sections = getAllHtagList();
  //     const rects = Array.from(sections)?.map((title) =>
  //       title.getBoundingClientRect()
  //     );
  //     const topRang = 300;
  //     for (let i = 0; i < sections.length; i++) {
  //       const title = sections[i] as HTMLElement; //标题的dom
  //       const rect = rects[i];
  //       debugger;
  //       if (rect.top >= 0 && rect.top < topRang) {
  //         setActiveIndex(i);
  //       }
  //     }
  //   });
  // };
  // const handleScroll = _.debounce(handleScrollTitle, 3000);
  const handleScroll = () => {
    debugger;
    requestAnimationFrame(() => {
      const sections = getAllHtagList();
      const scrollY = window.scrollY || window.pageYOffset;
      let currentIndex = 0;
      debugger;
      for (let i = 0; i < sections?.length; i++) {
        const sectionTop = (sections[i] as HTMLElement).offsetTop;
        if (scrollY >= sectionTop) {
          currentIndex = i;
        }
      }

      // 检查当前视图中是否有标题元素，如果有，将其索引赋给 currentIndex
      const visibleSections = Array.from(sections).filter((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionBottom =
          sectionTop + (section as HTMLElement).offsetHeight;
        return scrollY >= sectionTop && scrollY <= sectionBottom;
      });
      if (visibleSections.length > 0) {
        currentIndex = Array.from(sections).indexOf(
          visibleSections[visibleSections.length - 1]
        );
      }
      setActiveIndex(currentIndex);
      // 滚动目录以确保当前高亮的目录项可见
      const activeItem = document.querySelector(
        ".table-of-contents .active"
      ) as HTMLElement;
      if (activeItem) {
        const container = document.querySelector(".table-of-contents");
        const containerRect = container?.getBoundingClientRect();
        const activeRect = activeItem.getBoundingClientRect();
        const scrollTop =
          activeItem.offsetTop -
          containerRect!.height / 2 +
          activeRect.height / 2;
        container!.scrollTop = scrollTop;
      }
    });
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  useEffect(() => {
    if (action === "E") {
      searchEditorTxtApi.run();
    }
    window.addEventListener("scroll", handleScroll);
    if (isRealTimeediting) {
      createWebSocket("ws://localhost:8080");
    }
    return () => {
      if (isRealTimeediting) {
        closeWebSocket();
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Button type="primary" onClick={changeEditor}>
        保存
      </Button>
      {/* =================文章标题================== */}
      <div className="user-box">
        <input
          type="text"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            changeEditorTitleWs();
          }}
        />
      </div>
      <div className={styles.allInfo}>
        {/* =============编辑器部分================== */}
        <div
          style={{ border: "1px solid #ccc", zIndex: 100 }}
          className="content"
        >
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
            onChange={(editor) => {
              // 定义好所有的锚点结构
              setTableOfContents(generateTableOfContents());
              addAnchorLinks();
              if (isRealTimeediting) {
                if (websocket.readyState === WebSocket.OPEN) {
                  websocket &&
                    websocket?.send(
                      JSON.stringify({
                        editorContent: editor.getHtml(),
                        editorId: action === "A" ? guid() : editorId,
                        title,
                        action,
                      })
                    );
                } else {
                  console.error("websocket 断开了......");
                }
              }
            }}
            mode="default"
            style={{ height: "500px", overflowY: "hidden" }}
          />
        </div>
        {/* =============右侧目录部分================ */}
        <Affix offsetTop={180} className={styles.catalogue}>
          <div className="table-of-title">
            <span>目录</span>
          </div>
          <ul className="table-of-contents">
            {tableOfContents.map((item, index) => {
              return (
                <li
                  key={item.id}
                  style={{ paddingLeft: item.level * 20 + "px" }}
                >
                  <a
                    className={activeIndex === index ? "active" : ""}
                    href={`#${item.id}`}
                    onClick={() => {
                      setActiveIndex(index);
                      handleItemClick(index);
                    }}
                  >
                    <Tooltip title={item.text} color="lime" placement="leftTop">
                      {item.text}
                    </Tooltip>
                  </a>
                </li>
              );
            })}
          </ul>
        </Affix>
      </div>
    </>
  );
}

export default MyEditor;
