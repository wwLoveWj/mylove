import React, { useState } from "react";
import { Space, Button, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { history } from "umi";
import DeductionScoreDrawer from "./DeductionScoreDrawer";
import type { DataType } from "./type.d.ts";

// const data: DataType[] = [];
// for (let i = 0; i < 3; i++) {
//   data.push({
//     key: i,
//     username: `Edward King ${i}`,
//     age: 32,
//     weight: Math.random() * 200,
//     score: Math.random() * 100,
//   });
// }

const Index: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editData, setEditData] = useState<Partial<DataType>>({}); //获取编辑的数据
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("A"); //新增编辑操作 "E"为编辑，"A"为新增
  const [tableData, setTableData] = useState<DataType[]>(
    JSON.parse(localStorage.getItem("table-data") as any) || []
  );

  // 列表项配置
  const columns: TableColumnsType<DataType> = [
    {
      title: "姓名",
      dataIndex: "username",
    },
    {
      title: "年龄",
      dataIndex: "age",
    },
    {
      title: "体重",
      dataIndex: "weight",
    },
    {
      title: "分数",
      dataIndex: "score",
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (_, { score }) => {
        let color = Number(score) > 80 ? "green" : "yellow";
        if (Number(score) < 60) {
          color = "red";
        }
        return <Tag color={color}>{Math.floor(score)}</Tag>;
      },
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
    },
    {
      title: "Action",
      key: "action",
      sorter: true,
      render: (record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setEditData(record);
              setAction("E");
              setOpen(true);
            }}
          >
            编辑
          </a>
          <a
            onClick={() => {
              history.push(
                {
                  pathname: "/user-integral/integral-details",
                },
                { ...record }
              );
            }}
          >
            扣分细则
          </a>
        </Space>
      ),
    },
  ];
  // 批量操作处理
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  /**
   * 以下是多选框的操作处理
   * @param newSelectedRowKeys 勾选的数据项
   */
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  // ------------------------------------------------------
  // 以下是创建扣分项目的操作
  const submitDrawer = (res: any) => {
    if (action === "A") {
      setTableData([...tableData, res]);
      localStorage.setItem("table-data", JSON.stringify([...tableData, res]));
    } else {
      let index = tableData.findIndex((item) => item.userId === res.userId);
      let result = [...tableData];
      result[index] = res;
      setTableData([...result]);
      localStorage.setItem("table-data", JSON.stringify([...result]));
    }

    setOpen(false);
  };
  const onClose = () => {
    setOpen(false);
  };
  /**
   * 扣分操作
   */
  const deductionScore = () => {
    setAction("A");
    setEditData({});
    setOpen(true);
  };
  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Space size="small">
          <Button
            type="primary"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            批量操作
          </Button>
          <Button type="primary" onClick={deductionScore}>
            扣分
          </Button>
        </Space>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `已选择 ${selectedRowKeys.length} 项` : ""}
        </span>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableData}
        rowKey="userId"
        size="small"
      />
      {open && (
        <DeductionScoreDrawer
          open={open}
          action={action}
          submitDrawer={submitDrawer}
          onClose={onClose}
          editData={editData}
        />
      )}
    </>
  );
};

export default Index;
