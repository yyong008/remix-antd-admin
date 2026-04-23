import { PlusOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  TreeSelect,
  Upload,
  type FormItemProps,
  type UploadProps,
} from "antd";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type FieldBase = Omit<FormItemProps, "children"> & {
  fieldProps?: Record<string, unknown>;
};

export function ProFormText({ name, label, placeholder, rules, fieldProps, ...rest }: FieldBase) {
  return (
    <Form.Item name={name} label={label} rules={rules} {...rest}>
      <Input placeholder={placeholder} {...fieldProps} />
    </Form.Item>
  );
}

function ProFormTextPassword(props: FieldBase) {
  const { placeholder, rules, fieldProps, ...rest } = props;
  return (
    <Form.Item rules={rules} {...rest}>
      <Input.Password placeholder={placeholder} {...fieldProps} />
    </Form.Item>
  );
}
ProFormText.Password = ProFormTextPassword;

export function ProFormTextArea({
  name,
  label,
  placeholder,
  rules,
  fieldProps,
  ...rest
}: FieldBase) {
  return (
    <Form.Item name={name} label={label} rules={rules} {...rest}>
      <Input.TextArea placeholder={placeholder} {...fieldProps} />
    </Form.Item>
  );
}

export function ProFormDigit({ name, label, placeholder, rules, fieldProps, ...rest }: FieldBase) {
  return (
    <Form.Item name={name} label={label} rules={rules} {...rest}>
      <InputNumber style={{ width: "100%" }} placeholder={placeholder} {...fieldProps} />
    </Form.Item>
  );
}

export function ProFormSelect({
  name,
  label,
  placeholder,
  rules,
  options: optionsProp,
  request,
  mode,
  fieldProps,
  ...rest
}: FieldBase & {
  options?: { label: ReactNode; value: unknown }[];
  request?: () =>
    | Promise<{ label: ReactNode; value: unknown }[]>
    | { label: ReactNode; value: unknown }[];
  mode?: "multiple" | "tags";
}) {
  const [options, setOptions] = useState(optionsProp ?? []);
  useEffect(() => {
    if (request) {
      void Promise.resolve(request()).then((o) => setOptions(Array.isArray(o) ? o : []));
    } else {
      setOptions(optionsProp ?? []);
    }
  }, [request, optionsProp]);

  return (
    <Form.Item name={name} label={label} rules={rules} {...rest}>
      <Select mode={mode} placeholder={placeholder} options={options} {...fieldProps} />
    </Form.Item>
  );
}

export function ProFormDateTimePicker({
  name,
  label,
  rules,
  fieldProps,
  width: _w,
  ...rest
}: FieldBase & { width?: unknown }) {
  return (
    <Form.Item name={name} label={label} rules={rules} {...rest}>
      <DatePicker showTime style={{ width: "100%" }} {...fieldProps} />
    </Form.Item>
  );
}

export function ProFormTreeSelect({
  name,
  label,
  placeholder,
  rules,
  request,
  treeData: treeDataProp,
  fieldProps,
  ...rest
}: FieldBase & {
  request?: () => unknown[] | Promise<unknown[]>;
  treeData?: any[];
}) {
  const [treeData, setTreeData] = useState<any[]>([]);
  useEffect(() => {
    if (treeDataProp !== undefined) {
      setTreeData(treeDataProp);
      return;
    }
    if (!request) {
      setTreeData([]);
      return;
    }
    void Promise.resolve(request()).then((r) => setTreeData(Array.isArray(r) ? r : []));
  }, [request, treeDataProp]);

  return (
    <Form.Item name={name} label={label} rules={rules} {...rest}>
      <TreeSelect
        placeholder={placeholder}
        treeData={treeData}
        style={{ width: "100%" }}
        {...fieldProps}
      />
    </Form.Item>
  );
}

function ProFormRadioGroup({
  name,
  label,
  options,
  rules,
  fieldProps,
  radioType,
  width: _width,
  initialValue,
  tooltip,
  ...rest
}: FieldBase & {
  options?: { label: ReactNode; value: unknown; disabled?: boolean }[];
  radioType?: string;
  width?: unknown;
  initialValue?: unknown;
  tooltip?: ReactNode;
}) {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      initialValue={initialValue}
      tooltip={tooltip}
      {...rest}
    >
      <Radio.Group
        optionType={radioType === "button" ? "button" : undefined}
        options={options}
        {...fieldProps}
      />
    </Form.Item>
  );
}

export const ProFormRadio = { Group: ProFormRadioGroup };

type UploadFieldProps = FieldBase &
  Pick<UploadProps, "action" | "listType" | "max"> & {
    placeholder?: string;
  };

export function ProFormUploadButton({
  name,
  label,
  placeholder,
  rules,
  listType,
  action,
  max,
  fieldProps,
}: UploadFieldProps) {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      valuePropName="fileList"
      getValueFromEvent={(e) => e?.fileList ?? []}
    >
      <Upload action={action} listType={listType} maxCount={max} {...fieldProps}>
        {listType === "picture-card" ? (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>{placeholder}</div>
          </div>
        ) : (
          <button type="button">{placeholder ?? "上传"}</button>
        )}
      </Upload>
    </Form.Item>
  );
}
