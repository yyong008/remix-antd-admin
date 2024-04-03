// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Space } from "antd";

// constants
// import { ADMIN_ROUTE_PREFIX } from "~/constants";
import DeleteIt from "~/components/common/DeleteIt";
import { useFetcherChange } from "~/hooks/useFetcherChange";
import CategoryModal from "./CategoryModal";
import {
  createBlogCategory,
  getBlogCategoryListById,
} from "~/services/blog/blog-category";
import { getUserId } from "~/services/common/auth.server";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "Profile-Link" }];
};

// remix:action
export const action: LoaderFunction = async ({ request }) => {
  const method = request.method;

  if (method === "POST") {
    const data = await request.json();
    // 校验数据

    // 写入数据
    const linkCategory = await createBlogCategory({
      ...data,
      userId: await getUserId(request),
    });

    if (linkCategory === null) {
      return json({
        code: 0,
        message: "创建失败",
        data: {},
      });
    }

    return json({
      code: 0,
      message: "创建成功",
      data: linkCategory,
    });
  } else if (method === "PUT") {
    return json({
      code: 0,
      message: "暂不支持",
      data: {},
    });
  } else if (method === "DELETE") {
    return json({
      code: 0,
      message: "暂不支持",
      data: {},
    });
  }
};

// remix:loader
export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request);
  return json({
    dataSource: await getBlogCategoryListById(userId!),
  });
};

export default function SystemConfigRoute() {
  const { dataSource } = useLoaderData<typeof loader>();
  // const { lang } = useParams();
  const fetcher = useFetcherChange();

  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        dataSource={dataSource as any[]}
        toolBarRender={() => [
          <CategoryModal fetcher={fetcher} record={{}} key="tag-modal" />,
        ]}
        columns={[
          {
            dataIndex: "name",
            title: "标签名字",
          },
          {
            dataIndex: "description",
            title: "标签内容",
          },
          {
            dataIndex: "op",
            title: "操作",
            render(_, record) {
              return (
                <Space>
                  <CategoryModal
                    fetcher={fetcher}
                    record={record}
                    key="mod-category-modal"
                  />
                  <DeleteIt fetcher={fetcher} record={record} title={""} />
                </Space>
              );
            },
          },
        ]}
      />
    </PageContainer>
  );
}
