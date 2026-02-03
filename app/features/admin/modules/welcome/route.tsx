import { Card } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import { useParams } from "react-router";

export function Route() {
	const { locale } = useParams();
	const label = locale === "zh" ? "欢迎" : "Welcome";

	return (
		<PageContainer>
			<Card>
				<div>{label}</div>
			</Card>
		</PageContainer>
	);
}
