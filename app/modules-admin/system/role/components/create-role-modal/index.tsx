import * as ic from "@ant-design/icons";

import { Button, Form } from "antd";
import { ModalForm } from "@ant-design/pro-components";
import { useEffect, useMemo, useState } from "react";
import { FormItems } from "./form-items.tsx";

const { EditOutlined } = ic;

type CreateRoleModalProps = {
  trigger?: React.ReactNode;
  record: any;
  menu: any[];
  fetcher: any;
  menuRoles: any[];
};

export function CreateRoleModal(props: CreateRoleModalProps) {
  const { trigger, record, menu, fetcher, menuRoles } = props;
  const [form] = Form.useForm();
  const [checkedKeys, setCheckedKeys] = useState<any[]>([]);

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
      title="创建角色"
      trigger={
        trigger ??
        ((
          <Button
            type={!record.id ? "primary" : "link"}
            icon={<EditOutlined />}
          >
            {!record.id ? "新建" : ""}
          </Button>
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
                id: r.menus.id,
                key: r.menus.id,
                value: r.menus.id,
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
        onCancel: () => console.log(""),
      }}
      submitTimeout={2000}
      onFinish={async (vals) => {
        const values = record.id
          ? {
              ...vals,
              id: record.id,
            }
          : vals;

        fetcher.submit(values, {
          method: record.id ? "PUT" : "POST", // 修改或新建
          encType: "application/json",
        });
        return true;
      }}
    >
      <FormItems menu={menu} checkedKeys={checkedKeys} onCheck={onCheck} />
    </ModalForm>
  );
}
