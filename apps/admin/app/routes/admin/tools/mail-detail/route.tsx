import "./styles.css";

import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Space, Tooltip } from "antd";
import { href, Link, useParams } from "react-router";
import { PageContainer } from "~/components/page-container";
import { useEffect, useState } from "react";

import { MailForm } from "./components/MailForm";
import { QuillEditor } from "~/components/common/quill-editor";
import { useToolsMailById } from "~/api-client/queries/tools/tools-mail";

export function Route() {
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
