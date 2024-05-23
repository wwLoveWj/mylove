import React, { useState, useEffect } from "react";
import { useRequest } from "ahooks";
import { getEditorHtmlAPI } from "@/utils/request/api/editor";

interface ContentType {
  editorContent: string;
  id: number;
}
const Index = () => {
  const [articleContent, setArticleContent] = useState<ContentType[]>([]);
  //   获取编辑器信息
  useRequest(() => getEditorHtmlAPI({}), {
    debounceWait: 100,
    onSuccess: (res: ContentType[]) => {
      setArticleContent(res);
    },
  });
  return (
    <div>
      {articleContent.map((item) => (
        <p
          key={item.id}
          dangerouslySetInnerHTML={{ __html: item.editorContent }}
        ></p>
      ))}
    </div>
  );
};

export default Index;
