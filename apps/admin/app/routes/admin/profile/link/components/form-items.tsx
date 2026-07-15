import { Flex } from "antd";

import { ProFormText, ProFormTextArea } from "~/components/pro-form-kit";
import { m } from "~/paraglide/messages";
import { isValidLinkUrl, linkUrlRuleMessage } from "~/utils/link-url";

export function FormItems() {
  return (
    <Flex vertical gap={20}>
      <ProFormText
        name="name"
        label={m.profile_link_column_name()}
        placeholder={m.profile_link_field_name_placeholder()}
        rules={[
          {
            required: true,
            message: m.profile_link_field_name_required(),
          },
        ]}
      />
      <ProFormText
        name="url"
        label={m.profile_link_field_url()}
        placeholder={m.profile_link_field_url_placeholder()}
        fieldProps={{
          spellCheck: false,
        }}
        rules={[
          {
            required: true,
            message: m.profile_link_field_url_required(),
          },
          {
            validator: async (_: unknown, value: string) => {
              if (!value?.trim()) return Promise.resolve();
              if (!isValidLinkUrl(value)) {
                return Promise.reject(new Error(linkUrlRuleMessage));
              }
              return Promise.resolve();
            },
          },
        ]}
        extra={m.profile_link_url_invalid()}
      />
      <ProFormTextArea
        name="description"
        label={m.profile_link_field_description()}
        placeholder={m.profile_link_field_description_placeholder()}
        rules={[]}
      />
    </Flex>
  );
}
