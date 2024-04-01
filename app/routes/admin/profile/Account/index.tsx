// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDigit,
  ProFormText,
} from "@ant-design/pro-components";
import { createLinkCategory } from "~/services/profile/link-category";
// import { useFetcherChange } from "~/hooks/useFetcherChange";
import { getUserId } from "~/services/common/auth.server";
import { getUserInfoById } from "~/services/system/user";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "Profile-Link" }];
};

// remix:action
export const action: LoaderFunction = async ({ request }) => {
  const data = await request.json();
  const userId = await getUserId(request);
  // 校验数据

  // 写入数据
  const linkCategory = await createLinkCategory({
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
};

// remix:loader
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  return json({
    dataSource: await getUserInfoById(userId!),
  });
};

export default function ProfileAccountRoute() {
  const { dataSource } = useLoaderData<typeof loader>();
  // const fetcher = useFetcherChange();
  // const { lang } = useParams();

  return (
    <PageContainer>
      <ProCard>
        <ProForm
          initialValues={{
            ...dataSource,
            department: dataSource?.department?.name,
          }}
          readonly={true}
          layout="horizontal"
          labelCol={{ span: 1.7 }}
        >
          {/* <ProFormUploadButton
            name="file"
            label="用户头像"
            max={2}
            fieldProps={{
              name: "file",
              listType: "picture-card",
            }}
            action="/uploads"
          /> */}
          <ProFormText label="用户名" name="name" />
          <ProFormText label="昵称" name="nickname" />
          <ProFormText label="邮箱" name="email" />
          <ProFormText label="备注" name="remark" />
          <ProFormText label="语言" name="theme" />
          <ProFormText label="主题" name="lang" />
          <ProFormDigit label="手机号" name="phone" />
          <ProFormText label="创建时间" name="createdAt" />
          <ProFormText label="部门" name="department" />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
}
