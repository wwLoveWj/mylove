import React, { useState } from "react";
import { Space, Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { history } from "umi";
import dayjs from "dayjs";
import { useRequest } from "ahooks";
import {
  getEditorTableAPI,
  EditorInfoDeleteAPI,
} from "@/utils/request/api/editor";
import DelPopconfirm from "@/components/DelPopconfirm";
import type { TableDataType } from "./type.d.ts";

const Index: React.FC = () => {
  const [tableData, setTableData] = useState<TableDataType[]>([]); //文章信息表格

  // 查询列表信息
  const GetEditorTableAPIRun = useRequest(
    (params: any) => getEditorTableAPI(params),
    {
      debounceWait: 100,
      onSuccess: (res: TableDataType[]) => {
        setTableData(res);
      },
    }
  );
  //   删除文章列表数据接口
  const EditorInfoDeleteAPIRun = useRequest(
    (params: any) => EditorInfoDeleteAPI(params),
    {
      debounceWait: 100,
      manual: true,
      onSuccess: () => {
        GetEditorTableAPIRun.run();
      },
    }
  );
  // 列表项配置
  const columns: TableColumnsType<TableDataType> = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "编辑内容",
      dataIndex: "editorContent",
      render: (_, { editorContent }) => {
        return <p dangerouslySetInnerHTML={{ __html: editorContent }}></p>;
      },
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      render: (_, { createTime }) => {
        return createTime
          ? dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
          : "-";
      },
    },
    {
      title: "Action",
      key: "action",
      sorter: true,
      render: (record) => (
        <Space size="middle">
          <a
            onClick={() => {
              history.push(
                { pathname: "/article/edit" },
                { ...record, action: "E" }
              );
            }}
          >
            编辑
          </a>
          <DelPopconfirm
            onConfirm={() => {
              EditorInfoDeleteAPIRun.run({ userId: record?.editorId });
            }}
            title={`确定要删除【${record?.title}】的用户信息吗?`}
          />
          {/* <a
            onClick={() => {
              history.push(
                {
                  pathname: "/user-integral/integral-details",
                },
                { ...record }
              );
            }}
          >
            详情
          </a> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Space size="small">
          <Button
            type="primary"
            onClick={() => {
              history.push({ pathname: "/article/add" }, { action: "A" });
            }}
          >
            写文章
          </Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={tableData}
        rowKey="editorId"
        // sticky
        // scroll={{ y: "max-content" }}
        size="small"
      />
    </>
  );
};

export default Index;
