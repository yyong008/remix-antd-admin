import { Button, Form, Popconfirm, message } from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import { m } from "~/paraglide/messages";
import { useDeleteToolsMail } from "~/api-client/queries/tools/tools-mail";

type DeleteActionProps = {
  record: any;
  refetch: any;
};

export function DeleteAction(props: DeleteActionProps) {
  const { record, refetch } = props;
  const deleteMail = useDeleteToolsMail();
  return (
    <Form>
      <Popconfirm
        title={m.tools_mail_list_confirm_delete()}
        onConfirm={async () => {
          const ids = [record.id];

          const result = await deleteMail.mutateAsync({ ids });

          if (result?.code !== 0) {
            message.error(result?.message ?? m.tools_mail_list_toast_delete_failed());
            return;
          }

          refetch?.();
          message.success(m.tools_mail_list_toast_deleted());
        }}
      >
        <Button type="link" danger icon={<DeleteOutlined />} loading={deleteMail.isPending} />
      </Popconfirm>
    </Form>
  );
}
