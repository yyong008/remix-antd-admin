import { Button, Form, message } from "antd";

import { DrawerForm } from "~/components/pro-form-kit";
import { m } from "~/paraglide/messages";
import { FormItems } from "./form-items";
import {
  useCreateToolsMail,
  useSendToolsMail,
  useUpdateToolsMail,
} from "~/api-client/queries/tools/tools-mail";

export function MailForm({ data, content, refetch }: any) {
  const createMailTemplate = useCreateToolsMail();
  const updateMailTemplate = useUpdateToolsMail();
  const sendMail = useSendToolsMail();
  const [form] = Form.useForm();

  const onSaveTemplate = async () => {
    if (!content) {
      return message.error(m.tools_mail_content_required());
    }

    const vals: any = {
      name: form.getFieldValue("name"),
      subject: form.getFieldValue("subject"),
      to: form.getFieldValue("to"),
      replyTo: form.getFieldValue("replyTo"),
      content,
    };

    let result: any;
    if (data?.id) {
      vals.id = data.id;
      result = await updateMailTemplate.mutateAsync(vals);
    } else {
      result = await createMailTemplate.mutateAsync(vals);
    }
    if (result?.code !== 0) {
      message.error(result?.message ?? m.tools_mail_toast_save_failed());
      return false;
    }
    message.success(result?.message ?? m.tools_mail_toast_saved());
    refetch?.();
    form.resetFields();
    return true;
  };
  return (
    <DrawerForm
      loading={createMailTemplate.isPending || updateMailTemplate.isPending || sendMail.isPending}
      form={form}
      initialValues={{ ...data }}
      submitter={{
        render: (props, _doms) => {
          return [
            <Button
              type="primary"
              key="rest"
              onClick={() => {
                onSaveTemplate();
              }}
            >
              {m.tools_mail_save_template()}
            </Button>,
            <Button type="primary" key="submit" onClick={() => props.form?.submit?.()}>
              {m.tools_mail_send()}
            </Button>,
          ];
        },
      }}
      onFinish={async (v) => {
        if (!content) {
          message.error(m.tools_mail_content_required());
          return false;
        }
        const payload = {
          to: v.to,
          subject: v.subject,
          replyTo: v.replyTo,
          content,
        };
        const result = await sendMail.mutateAsync(payload);
        if (result?.code !== 0) {
          message.error(result?.message ?? m.tools_mail_toast_send_failed());
          return false;
        }
        message.success(result?.message ?? m.tools_mail_toast_sent());
        return true;
      }}
      trigger={<Button type="primary">{m.tools_mail_publish_button()}</Button>}
    >
      <FormItems />
    </DrawerForm>
  );
}
