import { PageContainer, ProCard } from "@ant-design/pro-components";
import { useLoaderData, useParams } from "@remix-run/react";

import { BlogEditForm } from "./components";
import { Form } from "antd";
import type { loader } from "./loader";
import { useFetcherChange } from "~/hooks";

export function Route() {
  const [form] = Form.useForm();
  const fetcher = useFetcherChange();
  const { id } = useParams();
  const { data } = useLoaderData<typeof loader>();

  return (
    <PageContainer>
      <ProCard>
        <BlogEditForm
          data={data}
          onFinish={async (v: any) => {
            const vals = v;
            if (id) vals.id = Number(id);
            const data = {
              type: "",
              data: {
                ...vals,
              },
            };
            fetcher.submit(data, {
              method: "PUT",
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
