import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
// import { useRequest } from "ahooks";
import { MailInfoSettingsAPI } from "@/utils/request/api/mail";
import styles from "./style.less";

const hostList = [
  { value: "smtp.163.com", label: "163邮箱" },
  { value: "smtp.qq.com", label: "qq邮箱" },
];

const Index = () => {
  const [form] = Form.useForm();
  const filterOption = (
    input: string,
    option?: { value: string; label: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <div className={styles.mailsSetting}>
      <Form
        layout="vertical"
        className={styles.mailsForm}
        form={form}
        onFinish={(value) => {
          const { user, pass, host } = value;
          MailInfoSettingsAPI({
            user,
            pass,
            host,
            current: JSON.parse(localStorage.getItem("login-info") || `{}`)
              ?.username,
          });
        }}
      >
        <Form.Item
          name="host"
          label="host"
          rules={[{ required: true, message: "请选择host" }]}
        >
          <Select
            placeholder="请选择host"
            options={hostList}
            filterOption={filterOption}
          />
        </Form.Item>
        <Form.Item
          name="user"
          label="邮箱"
          rules={[{ required: true, message: "请输入邮件" }]}
        >
          <Input placeholder="请输入邮件" />
        </Form.Item>
        <Form.Item
          name="pass"
          label="授权码"
          rules={[{ required: true, message: "请输入授权码" }]}
        >
          <Input placeholder="请输入授权码" />
        </Form.Item>
        <Space>
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default Index;
