import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Card, Button } from "antd";
import type { TableProps } from "antd";
import { useLocation } from "umi";
import AppealModal from "./AppealModal";

interface DataType {
  key: string;
  deductionPerson: string;
  deductionScore: number;
  deductionReason: string;
  deductionDate: string;
  deductionStatus: string;
}

const data: DataType[] = [
  {
    key: "1",
    deductionPerson: "John Brown",
    deductionScore: 32,
    deductionReason: "New York No. 1 Lake Park",
    deductionDate: "2024-05-06",
    deductionStatus: "0",
  },
  {
    key: "2",
    deductionPerson: "Jim Green",
    deductionScore: 42,
    deductionReason: "London No. 1 Lake Park",
    deductionDate: "2024-05-01",
    deductionStatus: "1",
  },
  {
    key: "3",
    deductionPerson: "Joe Black",
    deductionScore: 32,
    deductionReason: "Sydney No. 1 Lake Park",
    deductionDate: "2024-05-03",
    deductionStatus: "2",
  },
];

const deductionStatusMap = new Map([
  ["0", "待审核"],
  ["1", "不通过"],
  ["2", "通过"],
]);
const Index: React.FC = () => {
  const detailsData = (useLocation() as any).state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAppeal = () => {
    setIsModalOpen(true);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "扣除分数",
      dataIndex: "deductionScore",
      key: "deductionScore",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "扣分时间",
      dataIndex: "deductionDate",
      key: "deductionDate",
    },
    {
      title: "扣分原因",
      dataIndex: "deductionReason",
      key: "deductionReason",
    },
    {
      title: "扣分项目",
      dataIndex: "deductionItems",
      key: "deductionItems",
    },
    {
      title: "扣分人",
      key: "deductionPerson",
      dataIndex: "deductionPerson",
    },
    {
      title: "状态",
      key: "deductionStatus",
      dataIndex: "deductionStatus",
      render: (_, { deductionStatus }) => {
        let color =
          Number(deductionStatus) === 2
            ? "green"
            : Number(deductionStatus) === 1
              ? "red"
              : "yellow";
        return (
          <Tag color={color}>{deductionStatusMap.get(deductionStatus)}</Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={handleAppeal}
            disabled={record?.deductionStatus !== "0"}
          >
            申诉
          </Button>
          <a>审核</a>
        </Space>
      ),
    },
  ];
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Card
      title={detailsData.name}
      bodyStyle={{ padding: "15px 20px 15px 30px" }}
      bordered={false}
    >
      <Table columns={columns} dataSource={data} />
      <AppealModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </Card>
  );
};

export default Index;
