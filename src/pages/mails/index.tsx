import React from "react";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import { MailInfoSendAPI } from "@/utils/request/api/mail";
import Upload from "../files/Upload";

const { TextArea } = Input;

const receiverList = [
  {
    username: "ww",
    mail: "xxxx@163.com",
  },
  {
    username: "wj",
    mail: "xxx@qq.com",
  },
];
const Index = () => {
  const [form] = Form.useForm();
  return (
    <Form
      labelAlign="right"
      labelCol={{ span: 3 }}
      form={form}
      onFinish={(value) => {
        const { receiver, content, title, attachments } = value;
        MailInfoSendAPI({
          to: receiver,
          subject: title,
          text: content,
          attachments,
        });
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="title"
            label="主题"
            rules={[{ required: true, message: "请输入邮件主题名" }]}
          >
            <Input placeholder="请输入邮件主题名" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="receiver"
            label="收件人"
            rules={[{ required: true, message: "请选择收件人" }]}
          >
            <Select
              placeholder="请选择收件人"
              options={receiverList}
              fieldNames={{ label: "username", value: "mail" }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="content" label="正文">
            <TextArea
              showCount
              maxLength={100}
              placeholder="请输入你想说的话"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="attachments" label="附件">
            <Upload
              getImgUrl={({
                data,
              }: {
                data: { filename: string; path: string };
              }) => {
                // 获取到上传图片后得到的响应信息
                let param = {
                  filename: data?.filename,
                  path: data?.path,
                };
                form.setFieldValue("attachments", param);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Space>
        <Button htmlType="submit" type="primary">
          Send
        </Button>
      </Space>
    </Form>
  );
};

export default Index;
