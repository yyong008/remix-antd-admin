import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDigit,
  ProFormText,
} from "@ant-design/pro-components";

import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Component() {
  const { data: dataSource } = useLoaderData<typeof loader>();

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
          submitter={false}
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
