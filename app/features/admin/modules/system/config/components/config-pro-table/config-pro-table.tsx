import { PTable } from "@/components/pro-table";
import { useSystemConfigList } from "@/api-client/queries/system-config";
import { createConfigTableColumns } from "./config-create-columns";

export function ConfigProTable() {
	const { data, isLoading } = useSystemConfigList({ page: 1, pageSize: 10 });
	const list = (data as any)?.data?.list ?? [];

	return (
		<PTable
			headerTitle="Config"
			search={false}
			loading={isLoading}
			dataSource={list}
			columns={createConfigTableColumns()}
		/>
	);
}
