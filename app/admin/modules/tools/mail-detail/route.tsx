import "./styles.css";

import { Button, Space } from "antd";
import { Link, useParams } from "react-router";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { useEffect, useState } from "react";

import { MailForm } from "./components/MailForm";
import { QuillEditor } from "@/components/common/quill-editor";

export function Route() {
  const { lang } = useParams();
  const [content, setContent] = useState("");
  const { id } = useParams();
  const { data, isLoading } = {
    data: { data: { content: "hello" } },
    isLoading: false,
  }; // TODO: 获取邮件模板详情

  useEffect(() => {
    setContent(data?.data?.content);
  }, [data]);
  return (
    <PageContainer>
      <ProCard
        loading={isLoading}
        style={{ height: 600 }}
        title="发送邮件"
        tooltip="默认支持的邮箱服务包括：”QQ”、”163”、”126”、”iCloud”、”Hotmail”、”Yahoo”等"
        extra={
          <Space>
            <Link to={`/${lang}/admin/tools/mail/list`}>
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
      </ProCard>
    </PageContainer>
  );
}
