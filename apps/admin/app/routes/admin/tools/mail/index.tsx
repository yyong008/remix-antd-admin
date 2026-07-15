import "./styles.css";

import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Space, Tooltip } from "antd";
import { href, Link, useParams } from "react-router";
import type { MetaFunction } from "react-router";
import { PageContainer } from "~/components/page-container";
import { ReactEmailEditor } from "~/components/react-email";
import { m } from "~/paraglide/messages";
import { MailForm } from "./components/mail-form";

export const meta: MetaFunction = () => {
  return [{ title: m.tools_mail_title() }];
};

export default function Route() {
  const { locale } = useParams();
  return (
    <PageContainer>
      <Card
        style={{ height: 600 }}
        title={
          <Space size={4}>
            {m.tools_mail_title()}
            <Tooltip title={m.tools_mail_resend_tooltip()}>
              <QuestionCircleOutlined style={{ color: "var(--ant-color-text-description)" }} />
            </Tooltip>
          </Space>
        }
        extra={
          <Space>
            <Link to={href(`/:locale?/admin/tools/mail/list`, { locale })}>
              <Button type="primary">{m.tools_mail_view_templates()}</Button>
            </Link>
            <MailForm />
          </Space>
        }
      >
        <div style={{ height: "400px" }}>
          <ReactEmailEditor />
        </div>
      </Card>
    </PageContainer>
  );
}
