import { Button, Form } from "antd";
import { useEffect, useMemo, useState } from "react";

import { EditOutlined } from "@ant-design/icons";
import { FormItems } from "./RoleFormItems";
import { ModalForm } from "@ant-design/pro-components";
import { systemRoleApi } from "@/apis-client/admin/system/role/role";
import { useColorPrimary } from "@/hooks/use-color-primary";

type CreateRoleModalProps = {
  trigger?: React.ReactNode;
  record: any;
  menu: any[];
  menuRoles: any[];
  refetch: any;
};

export function UpdateRoleModal(props: CreateRoleModalProps) {
  const { trigger, record, menu, menuRoles, refetch } = props;
  const [form] = Form.useForm();
  const { colorPrimary } = useColorPrimary();
  const [checkedKeys, setCheckedKeys] = useState<any[]>([]);
  const [updateRole] = systemRoleApi.useUpdateRoleByIdMutation();

  const onCheck = (checkedKeys: any, info: any) => {
    setCheckedKeys(checkedKeys);
  };

  const initCheckKeys = useMemo(() => {
    if (record.id) {
      return menuRoles
        ?.filter((mr) => mr.roleId === record.id)
        ?.map((r) => r.menuId);
    } else {
      return [];
    }
  }, [menuRoles, record]);

  useEffect(() => {
    if (record.id) {
      setCheckedKeys(initCheckKeys);
    }
  }, [initCheckKeys, record.id]);

  return (
    <ModalForm
      title="更新角色"
      trigger={
        trigger ??
        ((
          <Button
            type="link"
            icon={
              <EditOutlined
                style={{ color: colorPrimary }}
                twoToneColor={colorPrimary}
              />
            }
          ></Button>
        ) as any)
      }
      form={form}
      autoFocusFirstInput
      onOpenChange={(e) => {
        if (e) {
          form.setFieldsValue({
            ...record,
            menus: menuRoles
              ?.filter((mr) => mr.roleId === record.id)
              ?.map((r) => ({
                id: r.id,
                key: r.id,
                value: r.id,
              })),
          });
          if (record.id) {
            const keys: any[] = menuRoles
              ?.filter((mr) => mr.roleId === record.id)
              ?.map((r) => r.menuId);
            setCheckedKeys(keys);
          }
        }
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {},
      }}
      submitTimeout={2000}
      onFinish={async (vals) => {
        const values = {
          ...vals,
          id: record.id,
        };

        await updateRole(values);
        refetch?.();
        return true;
      }}
    >
      <FormItems menu={menu} checkedKeys={checkedKeys} onCheck={onCheck} />
    </ModalForm>
  );
}
