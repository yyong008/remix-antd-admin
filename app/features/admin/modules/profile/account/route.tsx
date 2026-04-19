import { PageContainer, ProCard, ProForm } from "@ant-design/pro-components";

import { FormItems } from "./components/FormItems";

export function Route() {
  const { data, isLoading } = {
    data: { data: { name: "John Doe" } },
    isLoading: false,
  }; // TODO: get data from API
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
