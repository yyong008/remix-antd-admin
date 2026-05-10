import { Button, Form, type FormProps } from "antd";
import type { ReactNode } from "react";

type Submitter =
  | false
  | {
      searchConfig?: { submitText?: string };
      submitButtonProps?: React.ComponentProps<typeof Button>;
      resetButtonProps?: false | React.ComponentProps<typeof Button>;
    };

export type ProFormProps = Omit<FormProps, "children"> & {
  children?: ReactNode;
  submitter?: Submitter;
  readonly?: boolean;
};

const ProFormBase = ({
  children,
  submitter,
  onFinish,
  readonly,
  disabled,
  ...rest
}: ProFormProps) => {
  const mergedDisabled = Boolean(disabled) || Boolean(readonly);
  return (
    <Form onFinish={onFinish} disabled={mergedDisabled} {...rest}>
      {children}
      {submitter !== false && submitter ? (
        <Form.Item>
          <Button type="primary" htmlType="submit" {...(submitter.submitButtonProps ?? {})}>
            {submitter.searchConfig?.submitText ?? "提交"}
          </Button>
        </Form.Item>
      ) : null}
    </Form>
  );
};

export const ProForm = Object.assign(ProFormBase, {
  useForm: Form.useForm,
  Item: Form.Item,
});
