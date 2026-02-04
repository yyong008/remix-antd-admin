import { PageContainer, ProTable } from "@ant-design/pro-components";
import { useMemo, useRef } from "react";

import { CreateRoleModal } from "./components/CreateRoleModal";
import { ProTableHeaderTitle } from "./components/ProTableHeaderTitle";
import { createColumns } from "./components/create-columns";
import { genMenuTreeForRole } from "./utils";
import { usePage } from "~/hooks/usePagination";
import { useParams } from "react-router";
import { useMenuList } from "~/api-client/queries/system-menu";
import { useMenuRoleList } from "~/api-client/queries/system-menu-role";
import { useRoleList } from "~/api-client/queries/system-role";

export function Route() {
	const [page, setPage] = usePage();
	const { locale } = useParams();
	const actionRef = useRef<ActionType | null>(null);
	const { data: flatMenu } = useMenuList({ page: 1, pageSize: 1000 });
	const { data, isLoading, refetch } = useRoleList(page);
	const { data: menuRoleData } = useMenuRoleList();
	const menuRoles = menuRoleData?.data?.list || [];

	const menuAll = flatMenu?.data?.list || [];

	const menus = useMemo(() => {
		if (flatMenu) {
			return genMenuTreeForRole(menuAll, null);
		}
	}, [flatMenu, menuAll]);

	return (
		<PageContainer>
			<ProTable
				size="small"
				bordered
				headerTitle={<ProTableHeaderTitle title="角色管理" />}
				actionRef={actionRef}
				rowKey="id"
				search={false}
				loading={isLoading}
				dataSource={data?.data?.list || []}
				columns={createColumns({ locale, menus, menuRoles, refetch }) as any}
				options={{
					reload: refetch,
				}}
				pagination={{
					total: data?.data?.total || 0,
					pageSize: page.pageSize || 10,
					onChange(pageNumber, pageSize) {
						setPage({ page: pageNumber, pageSize });
					},
				}}
				toolBarRender={() => [
					<CreateRoleModal
						refetch={refetch}
						key="create-role-modal"
						menu={menus as any}
						menuRoles={menuRoles as any}
					/>,
				]}
			/>
		</PageContainer>
	);
}
