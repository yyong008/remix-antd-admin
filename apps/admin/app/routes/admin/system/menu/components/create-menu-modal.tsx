import { Button, Form } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import {
  MENU_MODAL_CLASS_NAMES,
  MENU_MODAL_WIDTH,
  menuModalFormLayout,
  menuModalStyles,
} from "./menu-modal-config";
import { MenuModalFormItems } from "./menu-modal-form-items";
import "./menu-modal-form.css";
import { ModalForm } from "~/components/pro-form-kit";
import { useCreateMenu } from "~/api-client/queries/system/system-menu";
import { m } from "~/paraglide/messages";

type MenuModalProps = {
  trigger?: () => void;
  menuNotPerm?: any[];
  refetch: any;
};

export function CreateMenuModal(props: MenuModalProps) {
  const { trigger, menuNotPerm, refetch } = props;
  const [form] = Form.useForm();
  const createMenu = useCreateMenu();
  const [innerMenuNotPerm, setInnerMenuNotPerm] = useState<any>();

  useEffect(() => {
    const n = [{ name: m.system_menu_modal_root(), key: "root", id: -1, children: menuNotPerm }];
    setInnerMenuNotPerm([...n]);
  }, [menuNotPerm]);

  return (
    <ModalForm
      {...menuModalFormLayout}
      preserve={false}
      title={m.system_menu_modal_create()}
      width={MENU_MODAL_WIDTH}
      trigger={
        trigger ??
        ((
          <Button type="primary" icon={<EditOutlined />}>
            {m.system_create()}
          </Button>
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
        await createMenu.mutateAsync(values);
        form.resetFields();
        refetch?.();
        return true;
      }}
    >
      <MenuModalFormItems innerMenuNotPerm={innerMenuNotPerm} form={form} />
    </ModalForm>
  );
}
