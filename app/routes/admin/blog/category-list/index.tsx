// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";

// components
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Space } from "antd";
import DeleteIt from "~/components/common/DeleteIt";
import CategoryModal from "./CategoryModal";
import * as _icon from "@ant-design/icons";

// constants
// import { ADMIN_ROUTE_PREFIX } from "~/constants";

// hooks
import { useFetcherChange } from "~/hooks/useFetcherChange";
import { goBlogNav } from "~/hooks/router/blog.route";

// services
import {
  createBlogCategory,
  getBlogCategory,
} from "~/services/blog/blog-category";
import { auth, getUserId } from "~/services/common/auth.server";

const { SwitcherOutlined } = _icon;

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "Profile-Link" }];
};

// remix:action
export const action: LoaderFunction = async ({ request, params }) => {
  const [userId, redirectToLogin] = await auth({ request, params } as any);

  if (!userId) {
    return redirectToLogin();
  }
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
  const [userId, redirectToLogin] = await auth({ request, params } as any);

  if (!userId) {
    return redirectToLogin();
  }
  return json({
    dataSource: await getBlogCategory(userId!),
  });
};

export default function SystemConfigRoute() {
  const { dataSource } = useLoaderData<typeof loader>();
  const { lang } = useParams();
  const fetcher = useFetcherChange();
  console.log("dataSource", dataSource);
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
            renderText(_, record) {
              return (
                <Link to={goBlogNav(lang!, { category: record.id })}>
                  <Space>
                    <SwitcherOutlined />
                    <span>{record.name}</span>
                  </Space>
                </Link>
              );
            },
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
