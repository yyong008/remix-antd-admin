import { Button, Form, message } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { FormItems } from "./FormItems";
import { ModalForm } from "@ant-design/pro-components";
import { useParams } from "react-router";

export function LinkModalCreate({ refetch }: any) {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [createProfileLinkById, other] = [
    (...args: any): any => {},
    { isLoading: false },
  ];

  return (
    <ModalForm
      key={Date.now()}
      preserve={false}
      title={"创建链接"}
      onOpenChange={() => {}}
      loading={other.isLoading}
      trigger={
        <Button type={"primary"} icon={<EditOutlined />}>
          新建
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
        const vals = {
          ...values,
        };

        if (id) {
          vals.categoryId = Number(id);
        }
        const result = await createProfileLinkById(vals);
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
      <FormItems />
    </ModalForm>
  );
}
