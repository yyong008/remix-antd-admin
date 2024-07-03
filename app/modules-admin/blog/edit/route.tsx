import { PageContainer, ProCard } from "@ant-design/pro-components";
import {
  useReadBlogQuery,
  useUpdateBlogByIdMutation,
} from "@/apis-client/admin/blog/blog";

import { BlogEditForm } from "./components";
import { message } from "antd";
import { useParams } from "@remix-run/react";

export function Route() {
  // const [form] = Form.useForm();

  const { id } = useParams();
  const { data, isLoading } = useReadBlogQuery({ id });
  const [updateBlog, other] = useUpdateBlogByIdMutation();
  return (
    <PageContainer>
      <ProCard loading={isLoading}>
        <BlogEditForm
          loading={other.isLoading}
          data={data?.data || {}}
          onFinish={async (v: any) => {
            const values = v;
            if (id) values.id = Number(id);
            const data = {
              type: "",
              data: {
                ...values,
              },
            };
            const result: any = await updateBlog(data);

            if (result.data && result.data.code === 1) {
              message.error(result.data.message);
              return false;
            } else {
              message.success(result.data.message);
              return true;
            }
          }}
        />
      </ProCard>
    </PageContainer>
  );
}
