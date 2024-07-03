import { Link, useParams } from "@remix-run/react";
import { PageContainer, ProCard } from "@ant-design/pro-components";

import { Button } from "antd";
import { MailForm } from "./components";

export function Route() {
  const { lang } = useParams();

  return (
    <PageContainer>
      <ProCard
        title="发送邮件"
        tooltip="默认支持的邮箱服务包括：”QQ”、”163”、”126”、”iCloud”、”Hotmail”、”Yahoo”等"
        extra={
          <Link to={`/${lang}/admin/tools/mail/list`}>
            <Button type="primary">查看所有模板</Button>
          </Link>
        }
      >
        <MailForm />
      </ProCard>
    </PageContainer>
  );
}
