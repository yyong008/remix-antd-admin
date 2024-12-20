import { PageContainer, ProCard, ProForm } from "@ant-design/pro-components";
import {
  useReadNewsQuery,
  useUpdateNewsByIdMutation,
} from "@/apis-client/admin/news/news";

import { FormItems } from "./components/FormItems";
import { message } from "antd";
import { useParams } from "@remix-run/react";
import { useReadNewsCategoryListQuery } from "@/apis-client/admin/news/category";

export function Route() {
  const { id } = useParams();

  const { data: newsCategoryList } = useReadNewsCategoryListQuery({
    page: 1,
    pageSize: 1000,
  });
  const { data, isLoading } = useReadNewsQuery(id);
  const [updateNewsById] = useUpdateNewsByIdMutation();
  return (
    <PageContainer>
      <ProCard loading={isLoading}>
        <ProForm
          initialValues={{ ...data?.data, date: data?.data?.publishedAt }}
          onFinish={async (v) => {
            const data = v;
            data.id = Number(id);
            const result = await updateNewsById(data);
            if (result.data?.code !== 0) {
              message.error(result.data?.message);
              return false;
            }
            message.success(result.data?.message);
            return true;
          }}
        >
          <FormItems newsCategoryList={newsCategoryList} />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
}
