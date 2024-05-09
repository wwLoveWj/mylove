import React, { useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import dayjs from "dayjs";
import { guid } from "@/utils";
import type { DataType } from "./type.d.ts";

const { Option } = Select;
const { TextArea } = Input;

const Index: React.FC<{
  open: boolean;
  submitDrawer: (res: any) => void;
  onClose: () => void;
  editData: Partial<DataType>;
  action: string;
}> = ({ open, submitDrawer, onClose, editData, action }) => {
  debugger;
  const [form] = Form.useForm();

  //   TODO:获取到用户信息
  const data = [
    {
      username: "ww",
      weight: 178,
      age: 20,
      score: 100,
    },
    {
      username: "wj",
      weight: 102,
      age: 18,
      score: 100,
    },
  ];
  const onFinish = () => {
    // 需要将扣分细则插入到用户信息表中
    form.validateFields().then((res) => {
      let obj: any = data.find((item) => item.username === res.username);
      let params = {
        createTime:
          action === "E"
            ? editData?.createTime
            : dayjs(new Date()).format("DD/MM/YYYY"),
        userId: action === "E" ? editData?.userId : guid(),
        ...res,
        ...obj,
        score: obj.score - Number(res.deductionScore),
      };
      submitDrawer(params);
    });
  };
  return (
    <Drawer
      title={action === "A" ? "扣分" : "编辑"}
      width={520}
      onClose={onClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={onClose}>取消</Button>
          <Button htmlType="submit" type="primary" onClick={onFinish}>
            提交
          </Button>
        </Space>
      }
    >
      {/* onFinish={onFinish} */}
      <Form
        layout="vertical"
        form={form}
        initialValues={action === "E" ? editData : {}}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="username"
              label="姓名"
              rules={[{ required: true, message: "请选择被扣分人姓名" }]}
            >
              <Select placeholder="请选择被扣分人姓名">
                <Option value="ww">Ww</Option>
                <Option value="wj">Wj</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="deductionScore"
              label="扣除分"
              rules={[{ required: true, message: "请选择扣除分数" }]}
            >
              <Select placeholder="请选择扣除分数">
                <Option value="1">1分</Option>
                <Option value="2">2分</Option>
                <Option value="3">3分</Option>
                <Option value="5">5分</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="reason"
              label="扣分原因"
              rules={[{ required: true, message: "请输入扣分原因" }]}
            >
              <TextArea
                showCount
                maxLength={100}
                placeholder="请输入扣分原因"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="description" label="备注">
              <TextArea showCount maxLength={100} placeholder="其它" />
            </Form.Item>
          </Col>
        </Row>
        {/* <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Space> */}
      </Form>
    </Drawer>
  );
};

export default Index;
