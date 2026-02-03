import "./styles.css";

import { Button, Space } from "antd";
import { href, Link, useParams } from "react-router";
import { PageContainer, ProCard } from "@ant-design/pro-components";

import { MailForm } from "./components/MailForm";
import { QuillEditor } from "@/components/common/quill-editor";
import { useState } from "react";

export function Route() {
	const { locale } = useParams();
	const [content, setContent] = useState("");
	return (
		<PageContainer>
			<ProCard
				style={{ height: 600 }}
				title="发送邮件"
				tooltip="默认支持的邮箱服务包括：”QQ”、”163”、”126”、”iCloud”、”Hotmail”、”Yahoo”等"
				extra={
					<Space>
						<Link to={href(`/:locale?/admin/tools/mail/list`, { locale })}>
							<Button type="primary">查看所有模板</Button>
						</Link>
						<MailForm content={content} />
					</Space>
				}
			>
				<div style={{ height: "400px" }}>
					<QuillEditor content={content} setContent={setContent} />
				</div>
			</ProCard>
		</PageContainer>
	);
}
