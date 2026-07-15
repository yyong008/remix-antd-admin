import "./styles.css";

import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Space, Tooltip } from "antd";
import { href, Link, useParams } from "react-router";
import type { MetaFunction } from "react-router";
import { useEffect, useState } from "react";
import { PageContainer } from "~/components/page-container";
import { QuillEditor } from "~/components/common/quill-editor";
import { m } from "~/paraglide/messages";
import { MailForm } from "./components/mail-form";
import { useToolsMailById } from "~/api-client/queries/tools/tools-mail";

export const handle = ({ params }: { params: { id?: string } }) => ({
  breadcrumb: [{ label: params.id ? `Mail: #${params.id}` : m.breadcrumb_detail() }],
});

export const meta: MetaFunction = () => {
  return [{ title: m.tools_mail_detail_title() }];
};

export default function Route() {
  const { locale } = useParams();
  const [content, setContent] = useState("");
  const { id } = useParams();
  const { data, isLoading } = useToolsMailById(id ? Number(id) : undefined);

  useEffect(() => {
    if (data?.data?.content) {
      setContent(data?.data?.content);
    }
  }, [data?.data?.content]);
  return (
    <PageContainer>
      <Card
        loading={isLoading}
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
            <MailForm data={data?.data} content={content} />
          </Space>
        }
      >
        <div style={{ height: "400px" }}>
          <QuillEditor
            initContent={data?.data?.content}
            content={content}
            setContent={setContent}
          />
        </div>
      </Card>
    </PageContainer>
  );
}
