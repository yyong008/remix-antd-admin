import { Flex } from "antd";

import { ProFormText, ProFormTextArea } from "~/components/pro-form-kit";

import { isValidLinkUrl, linkUrlRuleMessage } from "~/utils/link-url";

export function FormItems() {
  return (
    <Flex vertical gap={20}>
      <ProFormText
        name="name"
        label="链接名"
        placeholder="请输入链接名称"
        rules={[
          {
            required: true,
            message: "请输入链接名称",
          },
        ]}
      />
      <ProFormText
        name="url"
        label="链接地址"
        placeholder="https://example.com"
        fieldProps={{
          spellCheck: false,
        }}
        rules={[
          {
            required: true,
            message: "请输入链接地址",
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
        extra={linkUrlRuleMessage}
      />
      <ProFormTextArea
        name="description"
        label="描述"
        placeholder="请输入描述（选填）"
        rules={[]}
      />
    </Flex>
  );
}
