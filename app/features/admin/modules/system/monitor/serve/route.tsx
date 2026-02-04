import { Col, Row } from "antd";
import { useEffect, useState } from "react";

import { Cpu } from "./components/cpu";
import { Disk } from "./components/disk";
import { Mem } from "./components/mem";
import { OsRuntime } from "./components/os-runtime";
import { PageContainer } from "@ant-design/pro-components";
import { useMonitorServeInfo } from "~/api-client/queries/system-monitor-serve";

export function Route() {
	const [data, setData] = useState({
		nodeRuntime: {},
		osRuntime: {},
		diskInfo: {},
		memInfo: {},
		cupInfo: {},
		currentLoadInfo: {},
	});

	const { data: _data, isLoading } = useMonitorServeInfo();
	useEffect(() => {
		if (_data?.code === 0 && _data.data) {
			setData(_data.data);
		}
	}, [_data, isLoading]);

	const {
		nodeRuntime,
		osRuntime,
		diskInfo,
		memInfo,
		cupInfo,
		currentLoadInfo,
	} = data;

	return (
		<PageContainer loading={isLoading}>
			<Row gutter={[16, 16]}>
				<Col span={12}>
					<OsRuntime data={{ nodeRuntime, osRuntime }} />
				</Col>
				<Col span={12}>
					<Disk data={{ diskInfo }} />
				</Col>
				<Col span={12}>
					<Cpu data={{ cupInfo, currentLoadInfo }} />
				</Col>
				<Col span={12}>
					<Mem data={{ memInfo }} />
				</Col>
			</Row>
		</PageContainer>
	);
}
