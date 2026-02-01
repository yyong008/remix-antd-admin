import { PageContainer, ProCard } from "@ant-design/pro-components";

import { LoginIn, SignIn } from "./components";
import { useDashboard } from "~/api-client/queries/dashboard";

export function Route() {
	const { data, isLoading } = useDashboard();
	const dashboardData = (data as any)?.data;

	return (
		<PageContainer loading={isLoading}>
			<ProCard>
				<ProCard>
					<div className="flex justify-between">
						<LoginIn data={dashboardData} userInfo={{}} />
						<SignIn data={dashboardData} />
					</div>
				</ProCard>
			</ProCard>
		</PageContainer>
	);
}
