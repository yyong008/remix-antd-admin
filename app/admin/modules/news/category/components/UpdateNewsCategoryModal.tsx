import { Button, Form, message } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { ModalFormItems } from "./ModalFormItem";
import { useAntdThemeToken } from "~/hooks/useAntdThemeToken";

export function UpdateNewsCategoryModal({ record, refetch }: any) {
  const [form] = Form.useForm();
  const token = useAntdThemeToken();
  const iconStyles = { style: { color: token.colorPrimary } };
  const [updateNewsCategoryById, other] = [
    (...args: any[]) => {},
    { isLoading: false },
  ];
  return (
    <ModalForm
      loading={other.isLoading}
      key={Date.now()}
      preserve={false}
      title={record?.id ? "修改新闻分类" : "创建新建分类"}
      onOpenChange={(c) => {
        if (!c || !record.id) {
          return;
        }
        form.setFieldsValue({
          ...record,
        });
      }}
      trigger={
        <Button
          type={!record.id ? "primary" : "link"}
          icon={<EditOutlined {...iconStyles} />}
        >
          {!record.id ? "新建" : ""}
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const result: any = await updateNewsCategoryById({
          ...values,
          id: record.id,
        });

        if (result.data?.code !== 0) {
          message.error(result.data?.message);
          return false;
        }
        message.success(result.data?.message);
        refetch();
        form.resetFields();
        return true;
      }}
    >
      <ModalFormItems />
    </ModalForm>
  );
}
