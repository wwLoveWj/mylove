import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import { useRequest } from "ahooks";
import { MailInfoSendAPI } from "@/utils/request/api/mail";
import { UserInfo } from "@/utils/request/api/user";
import Upload from "../files/Upload";
const { TextArea } = Input;
import styles from "./settings/style.less";

const Index = () => {
  const [receiverList, setReceiverList] = useState([]);
  const [form] = Form.useForm();
  const filterOption = (
    input: string,
    option?: { username: string; email: string }
  ) => (option?.username ?? "").toLowerCase().includes(input.toLowerCase());
  /**
   * 查询用户信息接口
   */
  useRequest(() => UserInfo(), {
    debounceWait: 100,
    onSuccess: (res: any) => {
      setReceiverList(res);
    },
  });

  return (
    <div className={styles.mailsSetting}>
      <Form
        layout="vertical"
        className={styles.mailsForm}
        form={form}
        onFinish={(value) => {
          const { receiver, content, title, attachments } = value;
          MailInfoSendAPI({
            to: receiver.join(""),
            subject: title,
            text: content,
            attachments,
            currentUser: JSON.parse(localStorage.getItem("login-info") || `{}`)
              ?.username,
          });
        }}
      >
        <Form.Item
          name="title"
          label="主题"
          rules={[{ required: true, message: "请输入邮件主题名" }]}
        >
          <Input placeholder="请输入邮件主题名" />
        </Form.Item>
        <Form.Item
          name="receiver"
          label="收件人"
          rules={[{ required: true, message: "请选择收件人" }]}
        >
          <Select
            mode="multiple"
            allowClear
            placeholder="请选择收件人"
            options={receiverList}
            filterOption={filterOption}
            fieldNames={{ label: "username", value: "email" }}
          />
        </Form.Item>
        <Form.Item name="content" label="正文">
          <TextArea showCount maxLength={100} placeholder="请输入你想说的话" />
        </Form.Item>
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
        <Space>
          <Button htmlType="submit" type="primary">
            Send
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default Index;
