import * as as from "~/constants/actions";
import * as ic from "@ant-design/icons";

import { BlogTagModalForm } from "./blog-tag-modal-form";
import { Button } from "antd";

const { EditOutlined } = ic;

export function BlogTagModalCreate({ fetcher }: any) {
  return (
    <BlogTagModalForm
      title="创建标签"
      trigger={
        <Button type={"primary"} icon={<EditOutlined />}>
          新建
        </Button>
      }
      onFinish={async (values: any, form: any) => {
        const vals = {
          ...values,
        };
        const data = {
          type: as.ACTION_CREATE_BLOG_TAG,
          data: vals,
        };
        fetcher.submit(data, {
          method: "POST",
          encType: "application/json",
        });
        form.resetFields();
        return true;
      }}
    />
  );
}
