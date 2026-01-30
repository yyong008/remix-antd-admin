import { Button, Form, message } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { ModalFormItems } from "./ModalFormItem";

type ModalFormCommonProps = {
  trigger?: any;
  treeOptions?: any;
};

export function ModalFormCommon(props: ModalFormCommonProps) {
  const { trigger, treeOptions } = props;
  const [form] = Form.useForm();
  const [createSystemDept] = [(...args: any): any => {}];
  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title="创建部门"
      onOpenChange={(c) => {
        if (!c) {
          return;
        }
      }}
      trigger={
        trigger ?? (
          <Button type="primary" icon={<EditOutlined />}>
            {"新建"}
          </Button>
        )
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const result: any = await createSystemDept(values).unwrap();
        if (result.code !== 0) {
          message.error(result.message ?? "删除失败");
        }

        message.success("删除成功");
        return true;
      }}
    >
      <ModalFormItems treeOptions={treeOptions} />
    </ModalForm>
  );
}
