import * as ic from "@ant-design/icons";

import BlogCategoryModalForm from "./blog-category-modal-form";
import { Button } from "antd";
import { type FetcherWithComponents } from "@remix-run/react";

const { EditOutlined } = ic;

export function BlogCategoryModalCreate({
  fetcher,
}: {
  fetcher: FetcherWithComponents<any>;
}) {
  return (
    <BlogCategoryModalForm
      title="创建分类"
      trigger={
        <Button type="primary" icon={<EditOutlined />}>
          新建
        </Button>
      }
      onFinish={async (values: any, form: any) => {
        const data = {
          type: "",
          data: {
            ...values,
          },
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
