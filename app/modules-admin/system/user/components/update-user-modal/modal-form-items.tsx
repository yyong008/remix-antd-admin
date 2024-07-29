import {
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { optionsLang, optionsStatus, optionsTheme } from "@/constants/options";

type UserModalFormItemsProps = {
  depts: any[];
  roles: any;
};

export function UserModalFormItems(props: UserModalFormItemsProps) {
  const { depts, roles } = props;
  return (
    <>
      <ProFormUploadButton
        name="file"
        label="上传头像"
        placeholder="请输入名称"
        listType="picture-card"
        action="/api/upload"
        max={1}
      />
      <ProFormText
        width="md"
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
      <ProFormSelect
        width="md"
        name="roles"
        label="角色"
        placeholder="选择角色"
        mode="multiple"
        rules={[
          {
            required: true,
            message: "请选择所属角色",
          },
        ]}
        options={roles.map((role: any) => {
          return { label: role.name, value: role.id };
        })}
      />
      <ProFormTreeSelect
        width="md"
        name="dept"
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
        width="md"
        name="lang"
        label="语言"
        placeholder="请输入名称"
        options={optionsLang}
      />
      <ProFormSelect
        width="md"
        name="theme"
        label="主题"
        placeholder="请输入名称"
        options={optionsTheme}
      />
      <ProFormTextArea name="remark" label="备注" />
      <ProFormRadio.Group name="status" label="状态" options={optionsStatus} />
    </>
  );
}
