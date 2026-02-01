import {
	ProjectAbout,
	ProjectDevelopmentDep,
	ProjectInfo,
	ProjectProductionDep,
} from "./components";

import { PageContainer } from "@ant-design/pro-components";
import { Space } from "antd";

export function Route() {
	return (
		<PageContainer>
			<Space direction="vertical">
				<ProjectAbout />
				<ProjectInfo />
				<ProjectProductionDep />
				<ProjectDevelopmentDep />
			</Space>
		</PageContainer>
	);
}
