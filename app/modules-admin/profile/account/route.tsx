import { PageContainer, ProCard, ProForm } from "@ant-design/pro-components";

import { FormItems } from "./components/FormItems";
import { useReadProfileAccountQuery } from "@/apis-client/admin/profile/account";

export function Route() {
  const { data, isLoading } = useReadProfileAccountQuery("");
  return (
    <PageContainer>
      <ProCard loading={isLoading}>
        <ProForm
          initialValues={{
            ...data?.data,
          }}
          readonly={true}
          layout="horizontal"
          labelCol={{ span: 1.7 }}
          submitter={false}
        >
          <FormItems />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
}
