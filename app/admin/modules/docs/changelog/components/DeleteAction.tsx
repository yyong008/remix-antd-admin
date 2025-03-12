import { Button, Form, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteDocsByIds } from "~/admin/apis/admin/docs";
import { useTranslation } from "react-i18next";
type DeleteActionProps = {
  refetch: any;
  record: any;
  title: string;
};

export function DeleteAction({ record, title, refetch }: DeleteActionProps) {
  const [form] = Form.useForm();
  const { t } = useTranslation("docs");
  return (
    <Form>
      <Popconfirm
        title={title || t("action.delete")}
        onConfirm={async () => {
          const ids = [record.id];
          const result: any = await deleteDocsByIds(ids);
          if (result?.code !== 0) {
            message.error(result?.message);
            return false;
          }
          message.success(result?.message);
          refetch();
          form.resetFields();
          return true;
        }}
        okText={t("action.confirm")}
        cancelText={t("action.cancel")}
      >
        <Button type="link" danger icon={<DeleteOutlined />} />
      </Popconfirm>
    </Form>
  );
}
