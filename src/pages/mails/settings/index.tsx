import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
// import { useRequest } from "ahooks";
import { MailInfoSettingsAPI } from "@/utils/request/api/mail";

const Index = () => {
  const [form] = Form.useForm();

  return (
    <Form
      labelAlign="right"
      labelCol={{ span: 3 }}
      form={form}
      onFinish={(value) => {
        const { user, pass } = value;
        MailInfoSettingsAPI({
          user,
          pass,
        });
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="user"
            label="邮箱"
            rules={[{ required: true, message: "请输入邮件" }]}
          >
            <Input placeholder="请输入邮件" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="pass"
            label="授权码"
            rules={[{ required: true, message: "请输入授权码" }]}
          >
            <Input placeholder="请输入授权码" />
          </Form.Item>
        </Col>
      </Row>
      <Space>
        <Button htmlType="submit" type="primary">
          Save
        </Button>
      </Space>
    </Form>
  );
};

export default Index;
