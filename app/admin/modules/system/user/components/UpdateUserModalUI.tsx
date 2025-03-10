import { Alert, Button, Form, message } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { EditThemeIcon } from "@/components/common/write-theme-icons";
import type { FormLayout } from "antd/es/form/Form";
import { ModalForm } from "@ant-design/pro-components";

// import { PUpdateModal } from "@/components/pro-modal/modal";

type PModleProps = {
  reload?: () => any;
  preserve: boolean;
  title: string;
  onOpenChange: (c: boolean) => any;
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
      onOpenChange={(c) => props?.onOpenChange?.(c)}
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

type UpdateUserModalProps = {
  children: any;
  loading: boolean;
  handleUpdate: any;
  modalProps?: any;
  initValue: any;
  onOpenChange: any;
  reload: any;
};

export function PUpdateModal(props: any) {
  return <PModal trigger={<DefaultTiggerUpdate />} {...props} />;
}

function DefaultTiggerUpdate() {
  return (
    <Button type="primary" icon={<EditOutlined />}>
      更新
    </Button>
  );
}

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
      <div className="flex flex-col gap-3">
        <Alert message="不能在这里修改密码" type="warning" banner />
        {children}
      </div>
    </PUpdateModal>
  );
}
