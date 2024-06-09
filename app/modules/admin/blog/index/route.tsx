import { PageContainer, ProTable } from "@ant-design/pro-components";
import {
  blogColumnsCreate,
  createBlogCategoryToolBarRender,
} from "./components";
import { useEffect, useMemo } from "react";
import { useLoaderData, useParams, useSearchParams } from "@remix-run/react";

import type { loader } from "./loader";
import { message } from "antd";
import { useFetcherChange } from "~/hooks";

export function Route() {
  const data: any = useLoaderData<typeof loader>();
  const { dataSource, tag: tagInfo, category: categoryInfo } = data.data;
  const { lang } = useParams();
  let [searchParams] = useSearchParams();
  const fetcher = useFetcherChange();

  const info = useMemo(() => {
    let name = "";
    if (searchParams.get("category") && categoryInfo?.name)
      name = "分类: " + categoryInfo?.name;
    if (searchParams.get("tag") && tagInfo?.name)
      name = "标签: " + tagInfo?.name;

    return { name, categoryName: categoryInfo?.name, tagName: tagInfo?.name };
  }, [categoryInfo?.name, searchParams, tagInfo?.name]);

  useEffect(() => {
    if (data.code === 1) {
      message.error(data.message);
    }
  }, [data]);

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        size="small"
        search={false}
        dataSource={dataSource as any[]}
        headerTitle={info.name}
        toolBarRender={() => createBlogCategoryToolBarRender(lang!)}
        columns={blogColumnsCreate(lang!, fetcher, info) as any}
      />
    </PageContainer>
  );
}
