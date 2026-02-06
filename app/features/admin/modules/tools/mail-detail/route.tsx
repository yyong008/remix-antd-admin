import "./styles.css";

import { Button, Space } from "antd";
import { href, Link, useParams } from "react-router";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { useEffect, useState } from "react";

import { MailForm } from "./components/MailForm";
import { QuillEditor } from "@/components/common/quill-editor";
import { useToolsMailById } from "~/api-client/queries/tools-mail";

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
			<ProCard
				loading={isLoading}
				style={{ height: 600 }}
				title="发送邮件"
				tooltip="当前使用 Resend 发送服务"
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
			</ProCard>
		</PageContainer>
	);
}
