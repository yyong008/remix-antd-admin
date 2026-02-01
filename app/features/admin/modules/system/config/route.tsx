import { PageContainer, ProCard } from "@ant-design/pro-components";

import { ConfigProTable } from "./components/config-pro-table/config-pro-table";

export function Route() {
	return (
		<PageContainer>
			<ProCard>
				<ConfigProTable />
			</ProCard>
		</PageContainer>
	);
}
