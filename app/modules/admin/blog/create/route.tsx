import { PageContainer, ProCard } from "@ant-design/pro-components";

import { BlogCreateForm } from "./components";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Route() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <PageContainer>
      <ProCard>
        <BlogCreateForm
          data={data}
          onFinish={async (v: any, form: any, fetcher: any) => {
            const data = {
              type: "",
              data: {
                ...v,
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
      </ProCard>
    </PageContainer>
  );
}
