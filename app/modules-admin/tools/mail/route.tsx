import "./styles.css";

import { Button, Space } from "antd";
import { Link, useParams } from "@remix-run/react";
import { PageContainer, ProCard } from "@ant-design/pro-components";

import { MailForm } from "./components";
import { QuillEditor } from "@/components/common/quill-editor";

export function Route() {
  const { lang } = useParams();

  return (
    <PageContainer>
      <ProCard
        style={{ height: 600 }}
        title="发送邮件"
        tooltip="默认支持的邮箱服务包括：”QQ”、”163”、”126”、”iCloud”、”Hotmail”、”Yahoo”等"
        extra={
          <Space>
            <Link to={`/${lang}/admin/tools/mail/list`}>
              <Button type="primary">查看所有模板</Button>
            </Link>
            <MailForm />
          </Space>
        }
      >
        <div style={{ height: "400px" }}>
          <QuillEditor />
        </div>
      </ProCard>
    </PageContainer>
  );
}
