import { Button, Form, type FormProps, Modal, type ModalProps, Space } from "antd";

import { adminModalFormLayout } from "./admin-modal-form-layout";
import type { FormInstance } from "antd/es/form";
import {
  cloneElement,
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export type ModalFormSubmitter =
  | false
  | {
      searchConfig?: { submitText?: string };
      submitButtonProps?: React.ComponentProps<typeof Button>;
      resetButtonProps?: false | React.ComponentProps<typeof Button>;
    };

export type ModalFormProps = Omit<FormProps, "onFinish"> & {
  title?: ReactNode;
  trigger?: ReactElement;
  form?: FormInstance;
  open?: boolean;
  onFinish?: (values: Record<string, unknown>) => Promise<boolean | void> | boolean | void;
  onOpenChange?: (open: boolean) => void;
  modalProps?: Omit<ModalProps, "open" | "onOk" | "footer" | "children">;
  loading?: boolean;
  submitter?: ModalFormSubmitter;
  submitTimeout?: number;
  width?: ModalProps["width"];
  autoFocusFirstInput?: boolean;
};

export function ModalForm({
  title,
  trigger,
  children,
  form: propForm,
  open: externalOpen,
  onFinish,
  onOpenChange,
  modalProps,
  loading,
  submitter,
  submitTimeout,
  width,
  initialValues,
  autoFocusFirstInput: _autoFocus,
  ...formRest
}: ModalFormProps) {
  const [innerForm] = Form.useForm();
  const form = propForm ?? innerForm;
  const [innerOpen, setInnerOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : innerOpen;

  const mergedLoading = Boolean(loading) || submitting;

  const close = useCallback(() => {
    if (!isControlled) {
      setInnerOpen(false);
    }
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  const handleOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInnerOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
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
        const done = () => {
          form.resetFields();
          close();
        };
        if (submitTimeout && submitTimeout > 0) {
          window.setTimeout(done, submitTimeout);
        } else {
          done();
        }
      } finally {
        setSubmitting(false);
      }
    },
    [close, form, onFinish, submitTimeout],
  );

  const prevExternalOpen = useRef(externalOpen);
  useEffect(() => {
    if (isControlled && externalOpen !== prevExternalOpen.current) {
      prevExternalOpen.current = externalOpen;
      onOpenChange?.(externalOpen);
    }
  }, [externalOpen, isControlled, onOpenChange]);

  const triggerEl =
    !isControlled && trigger
      ? cloneElement(trigger as ReactElement<{ onClick?: (e: React.MouseEvent) => void }>, {
          onClick: (e: React.MouseEvent) => {
            const props = trigger.props as { onClick?: (e: React.MouseEvent) => void };
            props.onClick?.(e);
            handleOpen(true);
          },
        })
      : null;

  const submitCfg = submitter === false ? null : submitter;
  const submitText = submitCfg?.searchConfig?.submitText ?? "确定";

  const showCancel = submitter === false ? false : submitter?.resetButtonProps !== false;

  const footer: ReactNode =
    submitter === false ? null : (
      <Space>
        {showCancel ? (
          <Button
            onClick={() => {
              modalProps?.onCancel?.({} as React.MouseEvent<HTMLButtonElement>);
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

  return (
    <>
      {triggerEl}
      <Modal
        {...modalProps}
        title={title ?? modalProps?.title}
        open={open}
        width={width ?? modalProps?.width}
        footer={footer}
        onCancel={(e) => {
          modalProps?.onCancel?.(e);
          form.resetFields();
          close();
        }}
      >
        <Form
          form={form}
          initialValues={initialValues}
          {...adminModalFormLayout}
          {...formRest}
          onFinish={runFinish}
          component={false}
        >
          {children as any}
        </Form>
      </Modal>
    </>
  );
}
