import { Button, Form } from "antd";
import { useEffect, useState } from "react";

import { EditOutlined } from "@ant-design/icons";
import { MenuModalFormItems } from "./MenuModalFormItems";
import { ModalForm } from "@ant-design/pro-components";
import { systemMenu } from "@/apis-client/admin/system/menu";
import { useColorPrimary } from "~/hooks/useColorPrimary";

type MenuModalProps = {
  trigger?: () => void;
  record?: any;
  refetch?: any;
  menuNotPerm?: any[];
};

export default function UpdateMenuModal({
  trigger,
  record,
  refetch,
  menuNotPerm,
}: MenuModalProps) {
  const [form] = Form.useForm();
  const { colorPrimary } = useColorPrimary();
  const [innerMenuNotPerm, setInnerMenuNotPerm] = useState<any>();
  const [updateMenu] = systemMenu.useUpdateMenuByIdMutation({});

  useEffect(() => {
    const n = [
      {
        name: "根目录",
        key: "root",
        id: -1,
        children: menuNotPerm,
      },
    ];

    setInnerMenuNotPerm([...n]);
  }, [menuNotPerm]);
  return (
    <ModalForm
      layout="horizontal"
      labelCol={{ span: 3 }}
      key={Date.now()}
      preserve={false}
      title={record?.id ? "修改菜单" : "创建菜单"}
      onOpenChange={(c) => {
        if (!c || !record.id) {
          return;
        }
        let parent_menu_id = null;
        if (record.id && record.parent_menu_id) {
          parent_menu_id = record.parent_menu_id;
        } else if (record.parent_menu_id === null) {
          parent_menu_id = -1;
        }
        form.setFieldsValue({
          ...record,
          parent_menu_id,
          type: Number(record.type),
        });
      }}
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
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const vals = { ...values };
        if (record.id) {
          vals.id = record.id;
        }
        await updateMenu(vals);
        refetch?.();
        form.resetFields();
        return true;
      }}
    >
      <MenuModalFormItems
        innerMenuNotPerm={innerMenuNotPerm}
        record={record}
        form={form}
      />
    </ModalForm>
  );
}
