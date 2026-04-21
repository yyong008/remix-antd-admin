import { DatePicker, Form, Input, Select } from "antd";

export const ModalFormItems = ({ categoriesOptions, tagsOptions }: any) => {
  return (
    <>
      <Form.Item
        label="博客标题"
        name="title"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="博客作者"
        name="author"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="博客来源"
        name="source"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="博客发布时间"
        name="publishedAt"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      >
        <DatePicker showTime style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="分类"
        name="categoryId"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      >
        <Select options={categoriesOptions} />
      </Form.Item>
      <Form.Item
        label="标签"
        name="tagId"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      >
        <Select options={tagsOptions} />
      </Form.Item>
      <Form.Item
        label="编写博客"
        name="content"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
    </>
  );
};
