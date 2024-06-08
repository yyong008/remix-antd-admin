import * as as from "~/constants/actions";
import * as ic from "@ant-design/icons";

import { BlogTagModalForm } from "./blog-tag-modal-form";
import { Button } from "antd";
import { useParams } from "@remix-run/react";

const { EditOutlined } = ic;

export function BlogTagModalUpdate({ record }: any) {
  const { id } = useParams();

  return (
    <BlogTagModalForm
      title="修改标签"
      onOpenChange={(c: any, form: any) => {
        if (!c || !record.id) {
          return;
        }
        form.setFieldsValue({
          ...record,
        });
      }}
      trigger={
        <Button type="link" icon={<EditOutlined />}>
          修改
        </Button>
      }
      onFinish={async (values: any, form: any) => {
        const vals = {
          ...values,
        };

        vals.categoryId = Number(id);
        vals.id = record.id;
        const data = {
          type: as.ACTION_UPDATE_BLOG_TAG,
          data: vals,
        };
        form.submit(data, {
          method: "POST",
          encType: "application/json",
        });
        form.resetFields();
        return true;
      }}
    />
  );
}
