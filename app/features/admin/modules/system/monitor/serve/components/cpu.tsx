import { Card, Descriptions } from "antd";

import { getPercent } from "../utils";

export function Cpu({ data }: any) {
	const { cupInfo, currentLoadInfo } = data;

	return (
		<>
			<Card title="CPU">
				<Descriptions>
					<Descriptions.Item
						label="cpu 信息"
						span={24}
						labelStyle={{ width: "50%" }}
					>
						{cupInfo.brand}
					</Descriptions.Item>
					<Descriptions.Item
						label="负载"
						span={24}
						labelStyle={{ width: "50%" }}
					>
						{getPercent(
							currentLoadInfo.rawCurrentLoad /
								currentLoadInfo.rawCurrentLoadIdle,
						)}
					</Descriptions.Item>
					{currentLoadInfo.coresLoad?.map((item: any, index: number) => {
						return (
							<Descriptions.Item
								label={`负载 ${index + 1}`}
								key={index}
								span={24}
								labelStyle={{ width: "50%" }}
							>
								{getPercent(item.rawLoad / item.rawLoadIdle)}
							</Descriptions.Item>
						);
					})}
				</Descriptions>
			</Card>
		</>
	);
}
