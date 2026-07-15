import { m } from "~/paraglide/messages";
import { ProFormText, ProFormTextArea } from "~/components/pro-form-kit";

export function FormItems() {
  return (
    <>
      <ProFormText
        name="name"
        label={m.profile_link_field_name()}
        placeholder={m.profile_link_field_name_placeholder()}
        rules={[
          {
            required: true,
            message: m.profile_link_field_name_required(),
          },
        ]}
      />
      <ProFormTextArea
        name="description"
        label={m.profile_link_field_description()}
        placeholder={m.profile_link_field_description_placeholder()}
        rules={[
          {
            required: false,
            message: m.profile_link_field_name_required(),
          },
        ]}
      />
    </>
  );
}
