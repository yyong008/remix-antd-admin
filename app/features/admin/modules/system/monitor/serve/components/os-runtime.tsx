import { Card, Descriptions, Tag } from "antd";

export function OsRuntime({ data }: any) {
	const { osRuntime, nodeRuntime } = data;
	return (
		<>
			<Card title="运行系统">
				<Descriptions>
					<Descriptions.Item
						label="操作系统"
						span={24}
						labelStyle={{ width: "50%" }}
					>
						<Tag>{osRuntime?.platform}</Tag>
					</Descriptions.Item>
					<Descriptions.Item
						label="系统架构"
						span={24}
						labelStyle={{ width: "50%" }}
					>
						<Tag>{osRuntime?.arch}</Tag>
					</Descriptions.Item>
					<Descriptions.Item
						label="Node版本"
						span={24}
						labelStyle={{ width: "50%" }}
					>
						<Tag>{nodeRuntime?.node}</Tag>
					</Descriptions.Item>
					<Descriptions.Item
						label="NPM版本"
						span={24}
						labelStyle={{ width: "50%" }}
					>
						<Tag>{nodeRuntime?.npm}</Tag>
					</Descriptions.Item>
				</Descriptions>
			</Card>
		</>
	);
}
