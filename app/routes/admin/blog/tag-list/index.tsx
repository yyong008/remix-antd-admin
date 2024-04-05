// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import {
  Link,
  useActionData,
  useLoaderData,
  useParams,
} from "@remix-run/react";

// components
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Space } from "antd";

// constants
import DeleteIt from "~/components/common/DeleteIt";
import { useFetcherChange } from "~/hooks/useFetcherChange";
import TagModal from "./TagModal";
import * as _icon from "@ant-design/icons";

// services
import { createBlogTag, getBlogCategoryTag } from "~/services/blog/blog-tags";
import { auth, getUserId } from "~/services/common/auth.server";
import { goBlogNav } from "~/hooks/router/blog.route";

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
    const userId = await getUserId(request);
    const linkCategory = await createBlogTag({
      ...data,
      userId,
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
  // const { id } = params;
  // const userId = await getUserId(request);
  return json({
    dataSource: await getBlogCategoryTag(userId!),
  });
  // return json({
  //   dataSource: []
  // })
};

export default function SystemConfigRoute() {
  const { dataSource } = useLoaderData<typeof loader>();
  const { lang } = useParams();
  const fetcher = useFetcherChange();
  const actionData = useActionData();
  console.log("actionData", actionData);

  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        dataSource={dataSource as any[]}
        toolBarRender={() => [
          <TagModal fetcher={fetcher} record={{}} key="tag-modal" />,
        ]}
        columns={[
          {
            dataIndex: "name",
            title: "标签名字",
            renderText(text, record, index, action) {
              return (
                <Link to={goBlogNav(lang!, { tag: record.id })}>
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
            title: "描述",
          },
          {
            dataIndex: "op",
            title: "操作",
            render(_, record) {
              return (
                <Space>
                  <TagModal
                    fetcher={fetcher}
                    record={record}
                    key="mod-tag-modal"
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
