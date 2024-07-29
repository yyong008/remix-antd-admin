import { Form, message } from "antd";

import { ModalForm } from "@ant-design/pro-components";
import { type FormLayout } from "antd/es/form/Form";

type PModleProps = {
  reload?: () => any;
  preserve: boolean;
  title: string;
  onOpenChange: (...args: any) => any;
  trigger: any;
  loading: boolean;
  onFinish: (values: any) => any;
  children: any;
  modalProps: any;
  layout: FormLayout | undefined;
  labelCol: any;
  wrapperCol: any;
  initValue?: any;
};

export function PModal({ reload, ...props }: PModleProps) {
  const [form] = Form.useForm();
  return (
    <ModalForm
      {...(props.initValue ? { initValue: props.initValue } : {})}
      labelCol={props.labelCol || { span: 3 }} // 设置 label 占用的列数
      wrapperCol={props.wrapperCol || { span: 18 }} // 设置 input 占用的列数
      layout={props.layout || undefined}
      key={Date.now()}
      preserve={false}
      title={props.title}
      onOpenChange={(c) => props?.onOpenChange?.(c, form)}
      trigger={props.trigger}
      form={form}
      autoFocusFirstInput
      modalProps={{
        ...props.modalProps,
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
        reload?.();
        form.resetFields();
        return true;
      }}
    >
      {props.children}
    </ModalForm>
  );
}
