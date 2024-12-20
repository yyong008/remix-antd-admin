import { PageContainer, ProCard, ProForm } from "@ant-design/pro-components";
import { useNavigate, useParams } from "@remix-run/react";

import { FormItems } from "./components/FormItems";
import { message } from "antd";
import { useCreateNewsMutation } from "@/apis-client/admin/news/news";
import { useReadNewsCategoryListQuery } from "@/apis-client/admin/news/category";

export function Route() {
  const nav = useNavigate();
  const { lang } = useParams();
  const [createNews] = useCreateNewsMutation();
  const { data: newsCategoryList, isLoading } = useReadNewsCategoryListQuery({
    page: 1,
    pageSize: 1000,
  });
  return (
    <PageContainer>
      <ProCard loading={isLoading}>
        <ProForm
          onFinish={async (v) => {
            const result = await createNews(v);
            if (result.data?.code !== 0) {
              message.error(result.data?.message);
              return false;
            }
            message.success(result.data?.message);
            nav(`/${lang}/admin/news/result`, {
              state: { title: v.title, id: result.data.data.id },
            });
            return true;
          }}
        >
          <FormItems newsCategoryList={newsCategoryList} />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
}
