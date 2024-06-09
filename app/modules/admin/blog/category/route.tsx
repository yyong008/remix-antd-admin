import { PageContainer, ProTable } from "@ant-design/pro-components";
import {
  blogCategoryColumnsCreate,
  createBlogCategoryToolBarRender,
} from "./components";
import { useLoaderData, useParams } from "@remix-run/react";

import type { loader } from "./loader";
import { useFetcherChange } from "~/hooks";

export function Route() {
  const { data } = useLoaderData<typeof loader>();
  const { lang } = useParams();
  const fetcher = useFetcherChange();

  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        dataSource={data as any[]}
        toolBarRender={() => createBlogCategoryToolBarRender(fetcher)}
        columns={blogCategoryColumnsCreate(lang!, fetcher)}
      />
    </PageContainer>
  );
}
