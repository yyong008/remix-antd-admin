// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { useLoaderData } from "@remix-run/react";

// components
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDigit,
  ProFormText,
} from "@ant-design/pro-components";

import { AdminProfileAccount } from "~/controllers/admin.profile.account.controller";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "Profile-Link" }];
};

export const action: LoaderFunction = AdminProfileAccount.action;
export const loader: LoaderFunction = AdminProfileAccount.loader;

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
