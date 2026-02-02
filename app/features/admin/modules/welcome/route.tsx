import { Card } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import { useParams } from "react-router";

export function Route() {
	const { lang } = useParams();
	const label = lang === "zh" ? "欢迎" : "Welcome";

	return (
		<PageContainer>
			<Card>
				<div>{label}</div>
			</Card>
		</PageContainer>
	);
}
