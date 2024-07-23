import { Form, message } from "antd";

import { ModalForm } from "@ant-design/pro-components";

type PModleProps = {
  refetch?: () => any;
  preserve: boolean;
  title: string;
  onOpenChange: (...args: any) => any;
  trigger: any;
  loading: boolean;
  onFinish: (values: any) => any;
  children: any;
};

export function PModal({ refetch, ...props }: PModleProps) {
  const [form] = Form.useForm();

  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title={props.title}
      onOpenChange={props.onOpenChange}
      trigger={props.trigger}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      loading={props.loading}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const result = await props.onFinish(values);
        if (result.data?.code !== 0) {
          message.error(result.data?.message);
          return false;
        }
        message.success(result.data?.message);
        refetch?.();
        form.resetFields();
        return true;
      }}
    >
      {props.children}
    </ModalForm>
  );
}
