import { Button, Form } from "antd";

import { EditThemeIcon } from "@/components/common/write-theme-icons";
import { PUpdateModal } from "@/components/pro-modal/modal";

type UpdateUserModalProps = {
  children: any;
  loading: boolean;
  handleUpdate: any;
  modalProps: any;
  initValue: any;
  onOpenChange: any;
  reload: any;
};

export function UpdateUserModalUI(props: UpdateUserModalProps) {
  const { children, loading, handleUpdate, ...restProps } = props;
  const [form] = Form.useForm();
  return (
    <PUpdateModal
      loading={loading}
      title="修改用户"
      trigger={<Button type="link" icon={<EditThemeIcon />} />}
      onFinish={async (values: any) => {
        return handleUpdate(values, form);
      }}
      {...restProps}
    >
      {children}
    </PUpdateModal>
  );
}
