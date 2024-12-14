import "./styles.css";

import { Button, Space } from "antd";
import { Link, useParams } from "@remix-run/react";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { useEffect, useState } from "react";

import { MailForm } from "./components";
import { QuillEditor } from "@/components/common/quill-editor";
import { useReadMailTemplateQuery } from "~/apis-client/admin/tools/mail";

export function Route() {
  const { lang } = useParams();
  const [content, setContent] = useState("");
  const { id } = useParams();
  const { data, isLoading } = useReadMailTemplateQuery(Number(id));

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
