import { Button, Form } from "antd";
import { useEffect, useState } from "react";

import { EditOutlined } from "@ant-design/icons";
import {
  MENU_MODAL_CLASS_NAMES,
  MENU_MODAL_WIDTH,
  menuModalFormLayout,
  menuModalStyles,
} from "./menu-modal-config";
import { MenuModalFormItems } from "./MenuModalFormItems";
import "./menu-modal-form.css";
import { ModalForm } from "~/components/pro-form-kit";
import { useColorPrimary } from "~/hooks/useColorPrimary";
import { useUpdateMenu } from "~/api-client/queries/system/system-menu";

type MenuModalProps = {
  trigger?: () => void;
  record?: any;
  refetch?: any;
  menuNotPerm?: any[];
};

export default function UpdateMenuModal({ trigger, record, refetch, menuNotPerm }: MenuModalProps) {
  const [form] = Form.useForm();
  const { colorPrimary } = useColorPrimary();
  const [innerMenuNotPerm, setInnerMenuNotPerm] = useState<any>();
  const updateMenu = useUpdateMenu();

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
      {...menuModalFormLayout}
      preserve={false}
      title={record?.id ? "修改菜单" : "创建菜单"}
      width={MENU_MODAL_WIDTH}
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
            icon={<EditOutlined style={{ color: colorPrimary }} twoToneColor={colorPrimary} />}
          ></Button>
        ) as any)
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnHidden: true,
        centered: true,
        styles: menuModalStyles(),
        classNames: MENU_MODAL_CLASS_NAMES,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const vals = { ...values };
        if (record.id) {
          vals.id = record.id;
        }
        await updateMenu.mutateAsync(vals);
        refetch?.();
        form.resetFields();
        return true;
      }}
    >
      <MenuModalFormItems innerMenuNotPerm={innerMenuNotPerm} record={record} form={form} />
    </ModalForm>
  );
}
