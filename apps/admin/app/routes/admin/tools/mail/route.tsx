import "./styles.css";

import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Space, Tooltip } from "antd";
import { href, Link, useParams } from "react-router";
import { PageContainer } from "~/components/page-container";

import { MailForm } from "./components/MailForm";
import { ReactEmailEditor } from "~/components/react-email";

export function Route() {
  const { locale } = useParams();
  return (
    <PageContainer>
      <Card
        style={{ height: 600 }}
        title={
          <Space size={4}>
            发送邮件
            <Tooltip title="当前使用 Resend 发送服务">
              <QuestionCircleOutlined style={{ color: "var(--ant-color-text-description)" }} />
            </Tooltip>
          </Space>
        }
        extra={
          <Space>
            <Link to={href(`/:locale?/admin/tools/mail/list`, { locale })}>
              <Button type="primary">查看所有模板</Button>
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
