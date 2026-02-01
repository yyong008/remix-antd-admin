import { CreateUserModal } from "./CreateUserModal";
import { ToolbarDeleteButton } from "./ToolbarDeleteButton";

type createToolBarRenderOptions = {
	reload: (...args: any) => any;
	depts: any[];
	roles: any[];
	selectedRow: any[];
	setSelectedRow: any;
};

export const createToolBarRender = ({
	reload,
	depts,
	roles,
	selectedRow,
	setSelectedRow,
}: createToolBarRenderOptions) => [
	<CreateUserModal key="create" depts={depts} roles={roles} reload={reload} />,
	<ToolbarDeleteButton
		key="delete"
		selectedRow={selectedRow}
		setSelectedRow={setSelectedRow}
		reload={reload}
	/>,
];
