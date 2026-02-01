import { Card, Descriptions } from "antd";

import { getGB } from "../utils";

export function Disk({ data }: any) {
	const { diskInfo } = data;

	return (
		<>
			<Card title="磁盘">
				<Descriptions>
					<Descriptions.Item
						label="总空间"
						span={24}
						labelStyle={{ width: "50%" }}
					>
						{getGB(diskInfo.size)} GB
					</Descriptions.Item>
					<Descriptions.Item
						label="已用空间"
						span={24}
						labelStyle={{ width: "50%" }}
					>
						{getGB(diskInfo.used)} GB
					</Descriptions.Item>
					<Descriptions.Item
						label="可用空间"
						span={24}
						labelStyle={{ width: "50%" }}
					>
						{getGB(diskInfo.available)} GB
					</Descriptions.Item>
				</Descriptions>
			</Card>
		</>
	);
}
