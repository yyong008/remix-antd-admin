import { Form } from "antd";
import {
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from "~/components/pro-form-kit";

type ModalFormItemsProps = {
  treeOptions: any;
};

export function ModalFormItems(props: ModalFormItemsProps) {
  const { treeOptions } = props;
  return (
    <>
      <ProFormText
        name="name"
        label="部门名称"
        placeholder="请输入"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormDigit
        name="orderNo"
        label="排序"
        placeholder="排序"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <Form.Item name="parent_department_id" label="父部门" rules={[{ required: false }]}>
        <ProFormTreeSelect
          placeholder="不修改无需填写"
          fieldProps={{
            treeData: treeOptions,
            showSearch: true,
            treeDefaultExpandAll: true,
          }}
        />
      </Form.Item>
      <ProFormTextArea
        name="description"
        label="描述"
        placeholder="不修改无需填写"
        rules={[
          {
            required: false,
            message: "请输入密码",
          },
        ]}
      />
    </>
  );
}
