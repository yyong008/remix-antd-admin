import {
	ProjectAbout,
	ProjectDevelopmentDep,
	ProjectInfo,
	ProjectProductionDep,
} from "./components";
import { Space, Tabs } from "antd";

import { ProConfigProvider } from "@ant-design/pro-components";
import { useState } from "react";

export function Route() {
	const [value, setValue] = useState("about");
	const items = [
		{
			key: "about",
			label: "about",
			children: (
				<Space direction="vertical">
					<ProjectAbout />
					<ProjectInfo />
				</Space>
			),
		},
		{
			key: "development",
			label: "development",
			children: <ProjectDevelopmentDep />,
		},
		{
			key: "production",
			label: "production",
			children: <ProjectProductionDep />,
		},
	];
	return (
		<div className="min-h-[80vh] py-[100px] px-4">
			<div className="mx-auto w-full max-w-5xl">
				<ProConfigProvider>
					<Tabs
						items={items}
						activeKey={value}
						onChange={setValue}
						tabPosition="left"
					/>
				</ProConfigProvider>
			</div>
		</div>
	);
}
