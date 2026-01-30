import {
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from "@ant-design/pro-components";
import { optionsLang, optionsStatus, optionsTheme } from "@/constants/options";

import UploadWithCrop from "@/components/common/UploadWithCrop";

type UserModalFormItemProps = {
  depts: any[];
  roles: any[];
  showPassword?: boolean;
};

export function UserModalFormItems(props: UserModalFormItemProps) {
  const { depts = [], roles = [], showPassword } = props;
  return (
    <>
      <UploadWithCrop />
      <ProFormText
        name="name"
        label="用户名"
        placeholder="请输入"
        rules={[
          {
            required: true,
            message: "请输入用户名",
          },
        ]}
      />
      {showPassword ? (
        <ProFormText.Password
          name="password"
          label="密码"
          placeholder="不修改无需填写"
          rules={[
            {
              required: false,
              message: "请输入密码",
            },
          ]}
        />
      ) : null}
      <ProFormSelect
        name="roles"
        label="角色"
        mode="multiple"
        fieldProps={{
          maxCount: 1,
        }}
        placeholder="选择角色"
        rules={[
          {
            required: true,
            message: "请选择所属角色",
          },
        ]}
        options={roles?.map((role: any) => {
          return { label: role.name, value: role.id };
        })}
      />
      <ProFormTreeSelect
        name="departmentId"
        label="部门"
        request={async () => {
          return depts;
        }}
        placeholder="请选择所属部门"
        rules={[
          {
            required: true,
            message: "请选择所属部门",
          },
        ]}
        fieldProps={{
          fieldNames: { label: "name", value: "id" },
        }}
      />
      <ProFormText name="nickname" label="昵称" placeholder="请输入" />
      <ProFormText name="email" label="邮箱" placeholder="请输入" />
      <ProFormText name="phone" label="手机号" placeholder="请输入" />
      <ProFormSelect
        name="lang"
        label="语言"
        placeholder="请输入名称"
        options={optionsLang}
        fieldProps={{
          defaultValue: "en",
        }}
      />
      <ProFormSelect
        name="theme"
        label="主题"
        placeholder="请输入名称"
        options={optionsTheme}
        fieldProps={{
          defaultValue: "light",
        }}
      />
      <ProFormTextArea name="remark" label="备注" />
      <ProFormRadio.Group name="status" label="状态" options={optionsStatus} />
    </>
  );
}
