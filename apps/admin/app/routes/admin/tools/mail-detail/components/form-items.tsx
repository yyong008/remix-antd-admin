import { ProFormText } from "~/components/pro-form-kit";
import { m } from "~/paraglide/messages";

export function FormItems() {
  return (
    <>
      <ProFormText
        label={m.tools_mail_field_name()}
        name="name"
        placeholder={m.tools_mail_field_name_placeholder()}
      />
      <ProFormText
        label={m.tools_mail_field_subject()}
        name="subject"
        placeholder={m.tools_mail_field_subject_placeholder()}
        rules={[
          {
            required: true,
            message: m.tools_mail_field_subject_placeholder(),
          },
        ]}
      />
      <ProFormText
        label={m.tools_mail_field_to()}
        name="to"
        placeholder={m.tools_mail_field_to_placeholder()}
        rules={[
          {
            required: true,
            message: m.tools_mail_field_to_placeholder(),
          },
        ]}
      />
      <ProFormText
        label={m.tools_mail_field_reply_to()}
        name="replyTo"
        placeholder={m.tools_mail_field_reply_to_placeholder()}
      />
    </>
  );
}
