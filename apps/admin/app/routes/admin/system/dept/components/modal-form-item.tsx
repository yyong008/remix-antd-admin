import { Form } from "antd";
import {
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from "~/components/pro-form-kit";
import { m } from "~/paraglide/messages";

type ModalFormItemsProps = {
  treeOptions: any;
};

export function ModalFormItems(props: ModalFormItemsProps) {
  const { treeOptions } = props;
  return (
    <>
      <ProFormText
        name="name"
        label={m.system_dept_field_name()}
        placeholder={m.tools_placeholder_enter()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <ProFormDigit
        name="orderNo"
        label={m.system_dept_field_order()}
        placeholder={m.system_dept_field_order()}
        rules={[{ required: true, message: m.tools_placeholder_enter() }]}
      />
      <Form.Item name="parent_department_id" label={m.system_dept_field_parent()}>
        <ProFormTreeSelect
          placeholder={m.system_dept_field_parent_placeholder()}
          fieldProps={{
            treeData: treeOptions,
            showSearch: true,
            treeDefaultExpandAll: true,
          }}
        />
      </Form.Item>
      <ProFormTextArea
        name="description"
        label={m.system_dept_field_description()}
        placeholder={m.system_dept_field_description_placeholder()}
      />
    </>
  );
}
