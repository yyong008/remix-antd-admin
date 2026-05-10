import { Button, Drawer, Form, type DrawerProps, type FormProps, Space, Spin } from "antd";

import { adminModalFormLayout } from "./admin-modal-form-layout";
import type { FormInstance } from "antd/es/form";
import { cloneElement, type ReactElement, type ReactNode, useCallback, useState } from "react";

export type DrawerFormSubmitter =
  | false
  | {
      searchConfig?: { submitText?: string };
      submitButtonProps?: React.ComponentProps<typeof Button>;
      resetButtonProps?: false | React.ComponentProps<typeof Button>;
      render?: (
        props: { form?: FormInstance },
        defaultDoms: ReactNode[],
      ) => ReactNode | ReactNode[];
    };

export type DrawerFormProps = Omit<FormProps, "onFinish"> & {
  title?: ReactNode;
  trigger?: ReactElement;
  form?: FormInstance;
  onFinish?: (values: Record<string, unknown>) => Promise<boolean | void> | boolean | void;
  onOpenChange?: (open: boolean) => void;
  drawerProps?: Omit<DrawerProps, "open">;
  loading?: boolean;
  submitter?: DrawerFormSubmitter;
  size?: DrawerProps["size"];
};

export function DrawerForm({
  title,
  trigger,
  children,
  form: propForm,
  onFinish,
  onOpenChange,
  drawerProps,
  loading,
  submitter,
  size: drawerFormSize,
  initialValues,
  ...formRest
}: DrawerFormProps) {
  const {
    width: drawerLegacyWidth,
    size: drawerSizeFromProps,
    ...restDrawerProps
  } = drawerProps ?? {};
  const [innerForm] = Form.useForm();
  const form = propForm ?? innerForm;
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const mergedLoading = Boolean(loading) || submitting;

  const close = useCallback(() => {
    setOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const handleOpen = useCallback(
    (next: boolean) => {
      setOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  const runFinish = useCallback(
    async (values: Record<string, unknown>) => {
      if (!onFinish) {
        close();
        return;
      }
      setSubmitting(true);
      try {
        const result = await onFinish(values);
        if (result === false) return;
        form.resetFields();
        close();
      } finally {
        setSubmitting(false);
      }
    },
    [close, form, onFinish],
  );

  const triggerEl =
    trigger &&
    cloneElement(trigger as ReactElement<{ onClick?: (e: React.MouseEvent) => void }>, {
      onClick: (e: React.MouseEvent) => {
        const props = trigger.props as { onClick?: (e: React.MouseEvent) => void };
        props.onClick?.(e);
        handleOpen(true);
      },
    });

  const submitCfg = submitter === false ? null : submitter;

  const submitText = submitCfg?.searchConfig?.submitText ?? "确定";

  const resetProps = submitCfg?.resetButtonProps;
  const showResetHidden =
    resetProps !== false &&
    typeof resetProps === "object" &&
    resetProps !== null &&
    (resetProps as { style?: { display?: string } }).style?.display === "none";

  let defaultFooter: ReactNode = null;
  if (submitter === false) {
    defaultFooter = null;
  } else if (submitCfg?.render) {
    defaultFooter = <Space wrap>{submitCfg.render({ form }, [])}</Space>;
  } else {
    defaultFooter = (
      <Space>
        {!showResetHidden ? (
          <Button
            onClick={() => {
              drawerProps?.onClose?.({} as React.MouseEvent<HTMLButtonElement>);
              form.resetFields();
              close();
            }}
          >
            取消
          </Button>
        ) : null}
        <Button
          type="primary"
          loading={mergedLoading}
          {...(submitCfg?.submitButtonProps ?? {})}
          onClick={() => form.submit()}
        >
          {submitText}
        </Button>
      </Space>
    );
  }

  return (
    <>
      {triggerEl}
      <Drawer
        {...restDrawerProps}
        title={title ?? drawerProps?.title}
        open={open}
        size={drawerFormSize ?? drawerSizeFromProps ?? drawerLegacyWidth}
        onClose={(e) => {
          drawerProps?.onClose?.(e);
          form.resetFields();
          close();
        }}
        footer={defaultFooter}
      >
        <Spin spinning={Boolean(loading)}>
          <Form
            form={form}
            initialValues={initialValues}
            {...adminModalFormLayout}
            {...formRest}
            onFinish={runFinish}
          >
            {children as any}
          </Form>
        </Spin>
      </Drawer>
    </>
  );
}
